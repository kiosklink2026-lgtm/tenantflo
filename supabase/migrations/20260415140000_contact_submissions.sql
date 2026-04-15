-- Contact form submissions from the marketing site.
-- Run in Supabase SQL editor or via CLI.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "Allow public contact inserts" on public.contact_submissions;

create policy "Allow public contact inserts"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);
