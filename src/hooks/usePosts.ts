'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Post = {
  id: string;
  title: string;
  content: string;
  sport: string;
  price?: number;
  created_at: string;
  user_id?: string;
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, sport, price, created_at, user_id')
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      else setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();

    // Realtime listener
    const channel = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { posts, loading, error };
}
