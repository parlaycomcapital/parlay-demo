'use client';

import { useState, useEffect } from 'react';
import { supabase, Like } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';
import { isPlaceholderMode, mockPosts } from '@/lib/mockData';

export function useLikes(postId: string) {
  const { user } = useSupabaseAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    fetchLikes();

    // Only set up realtime listener if not in placeholder mode
    if (!isPlaceholderMode()) {
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
    }
  }, [postId]);

  const fetchLikes = async () => {
    if (!postId) return;

    // Use mock data in placeholder mode
    if (isPlaceholderMode()) {
      const post = mockPosts.find(p => p.id === postId);
      setLikesCount(post?.likes_count || 0);
      setLiked(false); // Default to not liked
      setLoading(false);
      return;
    }

    try {
      // Check if user liked this post
      if (user?.id) {
        const { data: likeData } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', postId)
          .eq('user_id', user.id)
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
    } catch (error: any) {
      console.warn('Error fetching likes (placeholder mode fallback):', error.message);
      // Fallback to mock data
      const post = mockPosts.find(p => p.id === postId);
      setLikesCount(post?.likes_count || 0);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!user?.id) {
      // In placeholder mode, allow interaction without login
      if (isPlaceholderMode()) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
        console.log('Placeholder mode: Like toggled for post', postId);
        return;
      }
      // Redirect to auth
      window.location.href = '/auth?redirect=' + window.location.pathname;
      return;
    }

    if (!postId) return;

    // Handle in placeholder mode
    if (isPlaceholderMode()) {
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
      console.log('Placeholder mode: Like toggled for post', postId);
      return;
    }

    try {
      if (liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
        setLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (error) throw error;
        setLiked(true);
        setLikesCount(prev => prev + 1);

        // Create notification (only if not liking own post)
        const { data: post } = await supabase
          .from('posts')
          .select('author_id')
          .eq('id', postId)
          .single();

        if (post && post.author_id !== user.id) {
          await supabase.from('notifications').insert([
            {
              recipient_id: post.author_id,
              sender_id: user.id,
              type: 'like',
              entity_id: postId,
              entity_type: 'post',
            },
          ]);
        }
      }
    } catch (error: any) {
      console.warn('Error toggling like (placeholder mode fallback):', error.message);
      // Fallback to local state update
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
    }
  };

  return {
    liked,
    likesCount,
    loading,
    toggleLike,
  };
}
