-- Optional columns when signing up from the quiz (joinWaitlist + source=quiz).
-- Safe to run if columns already exist.

alter table public.waitlist
  add column if not exists quiz_score smallint,
  add column if not exists quiz_risk text;
