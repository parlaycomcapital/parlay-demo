import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'fan' | 'analyst' | 'admin';
  avatar_url?: string;
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
  is_premium: boolean;
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
