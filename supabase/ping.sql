-- Tiny function the keep-alive job calls. Run once in the Supabase SQL Editor.
create or replace function public.ping()
returns timestamptz
language sql
stable
as $$ select now() $$;

grant execute on function public.ping() to anon;
