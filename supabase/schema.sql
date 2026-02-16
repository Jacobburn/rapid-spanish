create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles ((lower(username)));

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  best_scores jsonb not null default '{}'::jsonb,
  attempt_stats jsonb not null default '{}'::jsonb,
  activity_entries jsonb not null default '[]'::jsonb,
  srs_state jsonb not null default '{}'::jsonb,
  gamification_state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists user_state_set_updated_at on public.user_state;
create trigger user_state_set_updated_at
before update on public.user_state
for each row execute function public.set_updated_at();

create table if not exists public.leaderboard_public (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text not null,
  progress_current integer not null default 0,
  progress_total integer not null default 0,
  progress_percent numeric(7, 3) not null default 0,
  weekly_points integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists leaderboard_public_username_lower_idx
  on public.leaderboard_public ((lower(username)));

drop trigger if exists leaderboard_public_set_updated_at on public.leaderboard_public;
create trigger leaderboard_public_set_updated_at
before update on public.leaderboard_public
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_state enable row level security;
alter table public.leaderboard_public enable row level security;

drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists profiles_self_insert on public.profiles;
create policy profiles_self_insert
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists user_state_self_select on public.user_state;
create policy user_state_self_select
on public.user_state
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists user_state_self_insert on public.user_state;
create policy user_state_self_insert
on public.user_state
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists user_state_self_update on public.user_state;
create policy user_state_self_update
on public.user_state
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists leaderboard_public_read_authenticated on public.leaderboard_public;
create policy leaderboard_public_read_authenticated
on public.leaderboard_public
for select
to authenticated
using (true);

drop policy if exists leaderboard_public_self_insert on public.leaderboard_public;
create policy leaderboard_public_self_insert
on public.leaderboard_public
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists leaderboard_public_self_update on public.leaderboard_public;
create policy leaderboard_public_self_update
on public.leaderboard_public
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.user_state to authenticated;
grant select, insert, update on public.leaderboard_public to authenticated;
