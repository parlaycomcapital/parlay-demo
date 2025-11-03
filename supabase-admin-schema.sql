-- Admin Dashboard & Moderation Schema
-- Run this in Supabase SQL Editor

-- Reports (content or users)
create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  target_type text check (target_type in ('post','comment','user','group')) not null,
  target_id uuid not null,
  reason text,
  details text,
  status text check (status in ('open','review','resolved','rejected')) default 'open',
  reporter_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Verification requests for analysts
create table if not exists verifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  portfolio_url text,
  explanation text,
  status text check (status in ('pending','approved','denied')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Group approvals
create table if not exists group_approvals (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid,
  status text check (status in ('pending','approved','rejected')) default 'pending',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Audit log
create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  meta jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table reports enable row level security;
alter table verifications enable row level security;
alter table group_approvals enable row level security;
alter table audit_logs enable row level security;

-- Reports policies
create policy "reports_insert" on reports 
  for insert 
  with check (auth.uid() = reporter_id);

create policy "reports_select_admin" on reports 
  for select 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "reports_update_admin" on reports 
  for update 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Verifications policies
create policy "verif_insert_self" on verifications 
  for insert 
  with check (auth.uid() = user_id);

create policy "verif_select_admin" on verifications 
  for select 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "verif_select_self" on verifications 
  for select 
  using (auth.uid() = user_id);

create policy "verif_update_admin" on verifications 
  for update 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Group approvals policies
create policy "group_approvals_select_admin" on group_approvals 
  for select 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "group_approvals_update_admin" on group_approvals 
  for update 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "group_approvals_insert_any" on group_approvals 
  for insert 
  with check (true);

-- Audit logs policies
create policy "audit_logs_select_admin" on audit_logs 
  for select 
  using (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "audit_logs_insert_admin" on audit_logs 
  for insert 
  with check (
    exists(
      select 1 from profiles p 
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Updated_at triggers
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_reports_updated_at before update on reports
  for each row execute function update_updated_at_column();

create trigger update_verifications_updated_at before update on verifications
  for each row execute function update_updated_at_column();

create trigger update_group_approvals_updated_at before update on group_approvals
  for each row execute function update_updated_at_column();

-- Indexes for performance
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_reports_target on reports(target_type, target_id);
create index if not exists idx_reports_created_at on reports(created_at desc);

create index if not exists idx_verifications_status on verifications(status);
create index if not exists idx_verifications_user_id on verifications(user_id);
create index if not exists idx_verifications_created_at on verifications(created_at desc);

create index if not exists idx_group_approvals_status on group_approvals(status);
create index if not exists idx_group_approvals_group_id on group_approvals(group_id);

create index if not exists idx_audit_logs_actor on audit_logs(actor_id);
create index if not exists idx_audit_logs_action on audit_logs(action);
create index if not exists idx_audit_logs_created_at on audit_logs(created_at desc);

