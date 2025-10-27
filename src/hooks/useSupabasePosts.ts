'use client';

import { useState, useEffect } from 'react';
import { supabase, Post } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

export function useSupabasePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          author:users(name, email, role, avatar_url)
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: {
    title: string;
    sport: string;
    content: string;
    price: number;
    is_premium: boolean;
    image_url?: string;
  }) => {
    if (!session?.user?.id) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        author_id: session.user.id,
      })
      .select(
        `
        *,
        author:users(name, email, role, avatar_url)
      `
      )
      .single();

    if (error) throw error;
    setPosts((prev) => [data, ...prev]);
    return data;
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    if (!session?.user?.id) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select(
        `
        *,
        author:users(name, email, role, avatar_url)
      `
      )
      .single();

    if (error) throw error;
    setPosts((prev) => prev.map((post) => (post.id === id ? data : post)));
    return data;
  };

  const deletePost = async (id: string) => {
    if (!session?.user?.id) throw new Error('Not authenticated');

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) throw error;
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}
