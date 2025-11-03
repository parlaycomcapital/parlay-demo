-- Social Engagement & Notifications Schema
-- Run this in Supabase SQL Editor

-- Follows
create table if not exists follows (
  id uuid primary key default uuid_generate_v4(),
  follower_id uuid references auth.users(id) on delete cascade,
  following_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

-- Comments
create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  author_id uuid references auth.users(id) on delete cascade,
  content text not null,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Notifications
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  recipient_id uuid references auth.users(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  type text check (type in ('like','comment','follow','reply')) not null,
  entity_id uuid,
  entity_type text check (entity_type in ('post','comment','user')),
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS
alter table follows enable row level security;
alter table comments enable row level security;
alter table notifications enable row level security;

-- Follows policies
create policy "read follows" on follows 
  for select 
  using (true);

create policy "insert follows" on follows 
  for insert 
  with check (auth.uid() = follower_id);

create policy "delete follows" on follows 
  for delete 
  using (auth.uid() = follower_id);

-- Comments policies
create policy "read comments" on comments 
  for select 
  using (true);

create policy "insert comment" on comments 
  for insert 
  with check (auth.uid() = author_id);

create policy "update own comment" on comments 
  for update 
  using (auth.uid() = author_id);

create policy "delete own comment" on comments 
  for delete 
  using (auth.uid() = author_id);

-- Notifications policies
create policy "users can read notifications" on notifications 
  for select 
  using (auth.uid() = recipient_id);

create policy "users can update read" on notifications 
  for update 
  using (auth.uid() = recipient_id);

create policy "insert notifications" on notifications 
  for insert 
  with check (true);

-- Indexes for performance
create index if not exists idx_follows_follower on follows(follower_id);
create index if not exists idx_follows_following on follows(following_id);
create index if not exists idx_follows_created_at on follows(created_at desc);

create index if not exists idx_comments_post_id on comments(post_id);
create index if not exists idx_comments_parent_id on comments(parent_id);
create index if not exists idx_comments_author_id on comments(author_id);
create index if not exists idx_comments_created_at on comments(created_at desc);

create index if not exists idx_notifications_recipient on notifications(recipient_id);
create index if not exists idx_notifications_is_read on notifications(is_read);
create index if not exists idx_notifications_created_at on notifications(created_at desc);
create index if not exists idx_notifications_type on notifications(type);

-- Updated_at trigger for comments
create or replace function update_comments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_comments_updated_at before update on comments
  for each row execute function update_comments_updated_at();

-- Function to create notification (called via triggers or app logic)
create or replace function create_notification()
returns trigger as $$
begin
  -- This will be called from application code
  -- For now, we just have the structure
  return new;
end;
$$ language plpgsql;

