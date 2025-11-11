'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { isPlaceholderMode, mockPosts } from '@/lib/mockData';

type Post = {
  id: string;
  title: string;
  content: string;
  sport: string;
  price?: number;
  created_at: string;
  user_id?: string;
  is_premium?: boolean;
  requires_subscription?: boolean;
  likes_count?: number;
  comments_count?: number;
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // Use mock data in placeholder mode
      if (isPlaceholderMode()) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(mockPosts as Post[]);
        setLoading(false);
        return;
      }

      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        setPosts(mockPosts as Post[]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, sport, price, created_at, user_id, is_premium, requires_subscription, likes_count, comments_count')
          .order('created_at', { ascending: false });
        if (error) {
          console.warn('Supabase error (using placeholder mode):', error.message);
          setPosts(mockPosts as Post[]);
        } else {
          setPosts(data || []);
        }
      } catch (err: any) {
        console.warn('Error fetching posts (using placeholder mode):', err.message);
        setPosts(mockPosts as Post[]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Only set up realtime listener if Supabase is configured and not in placeholder mode
    if (!isPlaceholderMode() && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      const channel = supabase
        .channel('posts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
          fetchPosts();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const createPost = async (postData: any) => {
    if (isPlaceholderMode()) {
      const newPost = { id: `mock-${Date.now()}`, ...postData, created_at: new Date().toISOString() };
      setPosts([newPost, ...posts]);
      return newPost;
    }

    try {
      const { data, error } = await supabase.from('posts').insert([postData]).select().single();
      if (error) throw error;
      
      // Add to local state immediately
      if (data) {
        setPosts([data, ...posts]);
      }
      return data;
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPostsByAuthor = (authorId: string) => {
    return posts.filter(post => post.user_id === authorId);
  };

  return { posts, loading, error, createPost, getPostById, getPostsByAuthor };
}
