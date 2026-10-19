export const retainedEmail = "victor.alves@caseej.com";
export const retainedUserId = "bb5c0df8-3b97-42ba-8c12-2360ca9dd920";
const removalIds = new Set([
  "d3fe3398-ce5b-4ee0-b07b-00916b9a65f9",
  "1186c5a1-199e-4fe1-b727-b3182442ca96",
  "3aef20b4-78cf-4921-9af1-e61e0586f65c",
  "ccd54fb4-a3eb-4566-bb0f-e6b1a0a433c8",
  "04a2e353-ce93-4790-b340-c3821800f8be",
  "755aef53-aa53-4234-ab9c-9071b51e3319",
  "ad93f12f-8972-4889-883e-6388dfa3232c",
]);
export function shouldRemoveAccount(user: { id: string; email?: string }) {
  return user.id !== retainedUserId && user.email?.toLowerCase() !== retainedEmail && removalIds.has(user.id);
}