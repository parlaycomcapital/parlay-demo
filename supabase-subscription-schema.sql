-- Supabase Subscription Schema
-- Run this in your Supabase SQL Editor after running supabase-auth-schema.sql

-- Update subscriptions table to use auth.users instead of public.users
-- First, drop the old foreign key if it exists
ALTER TABLE IF EXISTS public.subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- Drop old subscriptions table if exists (only if you have old schema)
-- DROP TABLE IF EXISTS public.subscriptions;

-- Create subscriptions table with auth.users reference
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier TEXT CHECK (tier IN ('basic', 'pro')) DEFAULT 'basic',
  status TEXT CHECK (status IN ('active', 'canceled', 'expired', 'past_due')) DEFAULT 'active',
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, status) -- One active subscription per user
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_subscription_id_idx ON public.subscriptions(stripe_subscription_id);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own subscriptions (for manual testing)
CREATE POLICY "Users can create own subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only system can update subscriptions (via service role or webhook)
-- For now, allow users to update their own (webhook will handle this in production)
CREATE POLICY "Users can update own subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on subscription updates
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_subscriptions_updated_at();

-- Function to handle Stripe webhook (will be called via API route)
-- This is for reference, actual webhook handling happens in Next.js API route
CREATE OR REPLACE FUNCTION handle_stripe_subscription_webhook(
  p_stripe_subscription_id TEXT,
  p_status TEXT,
  p_tier TEXT DEFAULT NULL,
  p_current_period_start TIMESTAMPTZ DEFAULT NULL,
  p_current_period_end TIMESTAMPTZ DEFAULT NULL,
  p_cancel_at_period_end BOOLEAN DEFAULT false
)
RETURNS void AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Find user by stripe_subscription_id
  SELECT user_id INTO v_user_id
  FROM public.subscriptions
  WHERE stripe_subscription_id = p_stripe_subscription_id
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Subscription not found: %', p_stripe_subscription_id;
  END IF;

  -- Update or insert subscription
  INSERT INTO public.subscriptions (
    user_id,
    tier,
    status,
    stripe_subscription_id,
    current_period_start,
    current_period_end,
    cancel_at_period_end
  )
  VALUES (
    v_user_id,
    COALESCE(p_tier, 'pro'),
    p_status,
    p_stripe_subscription_id,
    p_current_period_start,
    p_current_period_end,
    p_cancel_at_period_end
  )
  ON CONFLICT (user_id, status)
  DO UPDATE SET
    tier = COALESCE(p_tier, subscriptions.tier),
    status = p_status,
    current_period_start = COALESCE(p_current_period_start, subscriptions.current_period_start),
    current_period_end = COALESCE(p_current_period_end, subscriptions.current_period_end),
    cancel_at_period_end = p_cancel_at_period_end,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

