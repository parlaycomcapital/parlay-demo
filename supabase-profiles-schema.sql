-- Profiles table for user data
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  handle text unique,
  avatar_url text,
  role text check (role in ('creator','follower')) default 'follower',
  agreed_tos boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "read public profiles" on profiles for select using (true);
create policy "user can upsert own" on profiles for insert with check (auth.uid() = id);
create policy "user can update own" on profiles for update using (auth.uid() = id);

-- Index for handle lookups
create index if not exists profiles_handle_idx on profiles(handle);

-- Trigger to update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

