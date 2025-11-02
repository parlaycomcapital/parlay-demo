import { createClient } from '@supabase/supabase-js';
import { isPlaceholderMode } from './mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client, but operations will check placeholder mode
export const supabase = createClient(
  supabaseUrl === 'placeholder' || isPlaceholderMode() ? 'https://placeholder.supabase.co' : supabaseUrl,
  supabaseAnonKey === 'placeholder' || isPlaceholderMode() ? 'placeholder-key' : supabaseAnonKey
);

// Database types
export interface User {
  id: string;
  email: string;
  password?: string; // Only used during registration/auth
  role: 'creator' | 'follower';
  name?: string;
  avatar_url?: string;
  roi?: number;
  win_rate?: number;
  followers_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  sport: string;
  content: string;
  price: number;
  author_id: string;
  group_id?: string;
  is_premium: boolean;
  requires_subscription?: boolean;
  likes_count: number;
  comments_count: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface Purchase {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  post?: Post;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'basic' | 'pro';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  avatar_url?: string;
  member_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  replies?: Comment[];
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'like' | 'comment' | 'follow' | 'subscription' | 'group_invite';
  actor_id?: string;
  post_id?: string;
  comment_id?: string;
  group_id?: string;
  read: boolean;
  created_at: string;
  actor?: User;
}