'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';

export function useFollows() {
  const { user } = useSupabaseAuth();
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchFollowing = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id);

      if (error) throw error;

      const ids = new Set((data || []).map((f) => f.following_id));
      setFollowingIds(ids);
    } catch (error) {
      console.error('Error fetching follows:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [user?.id]);

  const isFollowing = (userId: string) => {
    return followingIds.has(userId);
  };

  const toggleFollow = async (followingId: string) => {
    if (!user || user.id === followingId) return;

    const isCurrentlyFollowing = isFollowing(followingId);

    try {
      if (isCurrentlyFollowing) {
        // Unfollow
        const { error } = await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', followingId);

        if (error) throw error;

        setFollowingIds((prev) => {
          const next = new Set(prev);
          next.delete(followingId);
          return next;
        });
      } else {
        // Follow
        const { error } = await supabase
          .from('follows')
          .insert([
            {
              follower_id: user.id,
              following_id: followingId,
            },
          ]);

        if (error) throw error;

        setFollowingIds((prev) => new Set([...prev, followingId]));

        // Create follow notification
        await supabase.from('notifications').insert([
          {
            recipient_id: followingId,
            sender_id: user.id,
            type: 'follow',
            entity_id: user.id,
            entity_type: 'user',
          },
        ]);
      }

      return !isCurrentlyFollowing;
    } catch (error) {
      console.error('Error toggling follow:', error);
      throw error;
    }
  };

  const getFollowerCount = async (userId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error fetching follower count:', error);
      return 0;
    }
  };

  const getFollowingCount = async (userId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error fetching following count:', error);
      return 0;
    }
  };

  return {
    isFollowing,
    toggleFollow,
    getFollowerCount,
    getFollowingCount,
    loading,
    refresh: fetchFollowing,
  };
}

