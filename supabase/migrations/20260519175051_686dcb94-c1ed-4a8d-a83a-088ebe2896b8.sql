create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  goal text not null,
  kg_range text,
  daily_activity text not null,
  training text not null,
  conditions text[] not null,
  obstacle text not null,
  telegram_sent boolean not null default false
);

alter table public.leads enable row level security;

-- No public policies — only service role (server functions) can read/write.
-- This prevents anonymous clients from listing or reading any lead data.