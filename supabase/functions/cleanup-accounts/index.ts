import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { retainedEmail, retainedUserId, shouldRemoveAccount } from "./policy.ts";

Deno.serve(async (request) => {
  const reply = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return reply({ error: "Missing server configuration" }, 500);
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const bearer = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!bearer) return reply({ error: "Unauthorized" }, 401);
  const { data: { user }, error: authError } = await client.auth.getUser(bearer);
  if (authError || !user || user.id !== retainedUserId || user.email?.toLowerCase() !== retainedEmail) return reply({ error: "Forbidden" }, 403);
  const { data: role, error: roleError } = await client.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (roleError || !role) return reply({ error: "Forbidden" }, 403);
  const body = await request.json().catch(() => null);
  if (body?.confirm !== "cleanup-preserve-victor") return reply({ error: "Confirmation required" }, 400);
  try {
    const { data, error } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw error;
    if (!data.users.some(u => u.id === retainedUserId && u.email?.toLowerCase() === retainedEmail)) throw new Error("Retained account missing");
    const targets = data.users.filter(shouldRemoveAccount);
    const ids = targets.map(u => u.id);
    if (ids.length) {
      const operations = [
        client.from("project_assignments").delete().in("user_id", ids),
        client.from("task_assignees").delete().in("user_id", ids),
        client.from("tasks").update({ assigned_to: null }).in("assigned_to", ids),
        client.from("project_invites").delete().or(`created_by.in.(${ids.join(",")}),used_by.in.(${ids.join(",")})`),
      ];
      for (const result of await Promise.all(operations)) if (result.error) throw result.error;
    }
    let deleted = 0;
    for (const target of targets) {
      const { error } = await client.auth.admin.deleteUser(target.id);
      if (error) throw error;
      deleted++;
    }
    return reply({ deleted, preserved: retainedEmail });
  } catch (error) {
    console.error("Account cleanup failed", error instanceof Error ? error.message : "Unknown failure");
    return reply({ error: "Cleanup failed; inspect server logs before retrying" }, 500);
  }
});