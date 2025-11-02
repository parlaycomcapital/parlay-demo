'use client';

import { useState, useEffect } from 'react';
import { supabase, Like } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

export function useLikes(postId: string) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    fetchLikes();

    // Set up realtime listener for likes
    const channel = supabase
      .channel(`likes:${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchLikes();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `id=eq.${postId}`,
        },
        (payload: any) => {
          if (payload.new?.likes_count !== undefined) {
            setLikesCount(payload.new.likes_count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const fetchLikes = async () => {
    if (!postId) return;

    try {
      // Check if user liked this post
      if (session?.user?.id) {
        const { data: likeData } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', postId)
          .eq('user_id', session.user.id)
          .single();

        setLiked(!!likeData);
      }

      // Get likes count from post
      const { data: postData } = await supabase
        .from('posts')
        .select('likes_count')
        .eq('id', postId)
        .single();

      setLikesCount(postData?.likes_count || 0);
    } catch (error) {
      console.error('Error fetching likes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!session?.user?.id) {
      // Redirect to login
      window.location.href = '/login?redirect=' + window.location.pathname;
      return;
    }

    if (!postId) return;

    try {
      if (liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', session.user.id);

        if (error) throw error;
        setLiked(false);
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: session.user.id,
          });

        if (error) throw error;
        setLiked(true);

        // Create notification
        const { data: post } = await supabase
          .from('posts')
          .select('author_id')
          .eq('id', postId)
          .single();

        if (post && post.author_id !== session.user.id) {
          await supabase.from('notifications').insert({
            user_id: post.author_id,
            type: 'like',
            actor_id: session.user.id,
            post_id: postId,
          });
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return {
    liked,
    likesCount,
    loading,
    toggleLike,
  };
}
