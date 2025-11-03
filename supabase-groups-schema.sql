-- Supabase Groups & Communities Schema
-- Run this in your Supabase SQL Editor after supabase-auth-schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Update groups table to use auth.users (if exists, alter; otherwise create)
DO $$ 
BEGIN
  -- Drop old foreign key if it references public.users
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'groups_creator_id_fkey' 
    AND table_name = 'groups'
  ) THEN
    ALTER TABLE public.groups DROP CONSTRAINT IF EXISTS groups_creator_id_fkey;
  END IF;
END $$;

-- Create or replace groups table with auth.users reference
CREATE TABLE IF NOT EXISTS public.groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cover_url TEXT,
  avatar_url TEXT,
  is_private BOOLEAN DEFAULT false,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create or replace group_members table
CREATE TABLE IF NOT EXISTS public.group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('owner', 'member', 'admin')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS groups_creator_id_idx ON public.groups(creator_id);
CREATE INDEX IF NOT EXISTS groups_created_at_idx ON public.groups(created_at DESC);
CREATE INDEX IF NOT EXISTS group_members_group_id_idx ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS group_members_user_id_idx ON public.group_members(user_id);

-- Enable RLS
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read groups" ON public.groups;
DROP POLICY IF EXISTS "Authenticated insert groups" ON public.groups;
DROP POLICY IF EXISTS "Authenticated members" ON public.group_members;
DROP POLICY IF EXISTS "Users can view own memberships" ON public.group_members;
DROP POLICY IF EXISTS "Users can join groups" ON public.group_members;
DROP POLICY IF EXISTS "Users can leave groups" ON public.group_members;

-- RLS Policies for groups
-- Public groups are readable by everyone
CREATE POLICY "Public read groups"
  ON public.groups FOR SELECT
  USING (is_private = false OR creator_id = auth.uid());

-- Authenticated users can create groups
CREATE POLICY "Authenticated insert groups"
  ON public.groups FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Creators can update their own groups
CREATE POLICY "Creators can update own groups"
  ON public.groups FOR UPDATE
  USING (auth.uid() = creator_id);

-- Creators can delete their own groups
CREATE POLICY "Creators can delete own groups"
  ON public.groups FOR DELETE
  USING (auth.uid() = creator_id);

-- RLS Policies for group_members
-- Users can view members of groups they belong to
CREATE POLICY "Users can view own memberships"
  ON public.group_members FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT creator_id FROM public.groups WHERE id = group_id
  ));

-- Authenticated users can join groups (if public)
CREATE POLICY "Users can join groups"
  ON public.group_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can leave groups
CREATE POLICY "Users can leave groups"
  ON public.group_members FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT creator_id FROM public.groups WHERE id = group_id
  ));

-- Function to update member_count when members join/leave
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.groups 
    SET member_count = member_count + 1 
    WHERE id = NEW.group_id;
    
    -- If creator joins, set role to 'owner'
    IF NEW.user_id IN (SELECT creator_id FROM public.groups WHERE id = NEW.group_id) THEN
      UPDATE public.group_members 
      SET role = 'owner' 
      WHERE id = NEW.id;
    END IF;
    
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.groups 
    SET member_count = GREATEST(member_count - 1, 0) 
    WHERE id = OLD.group_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_group_member_count_trigger ON public.group_members;

-- Create trigger
CREATE TRIGGER update_group_member_count_trigger
  AFTER INSERT OR DELETE ON public.group_members
  FOR EACH ROW
  EXECUTE FUNCTION update_group_member_count();

-- Function to automatically add creator as owner member when group is created
CREATE OR REPLACE FUNCTION add_creator_as_group_owner()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.group_members (group_id, user_id, role)
  VALUES (NEW.id, NEW.creator_id, 'owner')
  ON CONFLICT (group_id, user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS add_creator_as_owner_trigger ON public.groups;

-- Create trigger
CREATE TRIGGER add_creator_as_owner_trigger
  AFTER INSERT ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION add_creator_as_group_owner();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_groups_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_groups_updated_at ON public.groups;

-- Create trigger
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION update_groups_updated_at();

-- Ensure posts table has group_id column (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'group_id'
  ) THEN
    ALTER TABLE public.posts ADD COLUMN group_id UUID REFERENCES public.groups(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS posts_group_id_idx ON public.posts(group_id);
  END IF;
END $$;

