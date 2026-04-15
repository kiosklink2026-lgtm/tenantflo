-- Run in the Supabase SQL editor, or apply with the Supabase CLI.
-- Emails are stored lowercased from the app; unique prevents duplicates.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'landing',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "Allow public waitlist inserts" on public.waitlist;

create policy "Allow public waitlist inserts"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);
