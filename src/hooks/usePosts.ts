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
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        // Use mock data when Supabase is not configured
        setPosts([
          {
            id: '1',
            title: 'Manchester United vs Arsenal: Premier League Analysis',
            content: 'Comprehensive analysis of the Manchester United vs Arsenal Premier League clash. Key insights on team form, tactics, and predictions.',
            sport: 'Football',
            price: 15.99,
            created_at: new Date().toISOString(),
            user_id: '1'
          },
          {
            id: '2',
            title: 'Djokovic vs Nadal: French Open Semifinal Preview',
            content: 'Expert breakdown of the Djokovic vs Nadal French Open semifinal. Surface analysis and tactical insights.',
            sport: 'Tennis',
            price: 12.99,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            user_id: '2'
          },
          {
            id: '3',
            title: 'Lakers vs Warriors: NBA Playoff Analysis',
            content: 'Detailed analysis of the Lakers vs Warriors playoff series. Key matchups and strategic insights.',
            sport: 'Basketball',
            price: 18.99,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            user_id: '1'
          }
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, sport, price, created_at, user_id')
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      else setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();

    // Only set up realtime listener if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
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
    // TODO: Implement post creation
    console.warn('createPost not implemented');
    return null;
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getPostsByAuthor = (authorId: string) => {
    return posts.filter(post => post.user_id === authorId);
  };

  return { posts, loading, error, createPost, getPostById, getPostsByAuthor };
}
