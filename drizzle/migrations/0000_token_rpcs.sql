CREATE OR REPLACE FUNCTION public.get_contract_by_token(_token text)
RETURNS SETOF public.contracts LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM public.contracts WHERE token = _token LIMIT 1
$$;
CREATE OR REPLACE FUNCTION public.sign_contract(_token text, _name text, _document text, _address text, _signature text)
RETURNS SETOF public.contracts LANGUAGE sql VOLATILE SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.contracts SET client_name=_name, client_document=_document, client_address=_address,
    client_signature=_signature, status='signed', signed_at=now()
  WHERE token=_token AND status='pending' RETURNING *
$$;
CREATE OR REPLACE FUNCTION public.get_invite_by_token(_token text)
RETURNS SETOF public.project_invites LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM public.project_invites WHERE token = _token LIMIT 1
$$;
CREATE OR REPLACE FUNCTION public.accept_invite(_token text)
RETURNS boolean LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  UPDATE public.project_invites SET status='usado', used_by=auth.uid(), used_at=now()
  WHERE token=_token AND status='pendente' AND expires_at > now();
  RETURN FOUND;
END $$;
REVOKE ALL ON FUNCTION public.accept_invite(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_contract_by_token(text), public.sign_contract(text,text,text,text,text), public.get_invite_by_token(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.accept_invite(text) TO authenticated;

DROP POLICY IF EXISTS "Public can read contracts by token" ON public.contracts;
DROP POLICY IF EXISTS "Public can sign pending contracts" ON public.contracts;
CREATE POLICY "Managers can view contracts" ON public.contracts FOR SELECT TO authenticated USING (public.can_invite(auth.uid()));
CREATE POLICY "Managers can update contracts" ON public.contracts FOR UPDATE TO authenticated USING (public.can_invite(auth.uid()));
DROP POLICY IF EXISTS "Anyone can view invite by token" ON public.project_invites;
DROP POLICY IF EXISTS "Authenticated users can accept invites" ON public.project_invites;