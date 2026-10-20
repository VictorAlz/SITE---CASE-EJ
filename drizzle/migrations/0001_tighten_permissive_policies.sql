DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
CREATE POLICY "Members can view leads" ON public.leads FOR SELECT TO authenticated USING (public.has_minimum_role(auth.uid(), 'membro'::app_role));
CREATE POLICY "Members can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_minimum_role(auth.uid(), 'membro'::app_role)) WITH CHECK (public.has_minimum_role(auth.uid(), 'membro'::app_role));

DROP POLICY IF EXISTS "Authenticated can view projects" ON public.projects;
CREATE POLICY "Members view assigned projects" ON public.projects FOR SELECT TO authenticated USING (
  public.has_minimum_role(auth.uid(), 'diretor'::app_role) OR public.can_delegate(auth.uid())
  OR EXISTS (SELECT 1 FROM public.project_assignments pa WHERE pa.project_id = projects.id AND pa.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Authenticated can view wiki" ON public.wiki_articles;
CREATE POLICY "Team members can view wiki" ON public.wiki_articles FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;
CREATE POLICY "Anyone can view public site settings" ON public.site_settings FOR SELECT TO public USING (key = 'processo_seletivo');
CREATE POLICY "Admins can view all site settings" ON public.site_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));