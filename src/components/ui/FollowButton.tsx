'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck } from 'lucide-react';
import { useFollows } from '@/hooks/useFollows';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface FollowButtonProps {
  userId: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function FollowButton({
  userId,
  className = '',
  variant = 'default',
}: FollowButtonProps) {
  const { user } = useSupabaseAuth();
  const { isFollowing, toggleFollow } = useFollows();
  const [loading, setLoading] = useState(false);
  const [localFollowing, setLocalFollowing] = useState(isFollowing(userId));

  // Sync with hook state on mount and when userId changes
  useEffect(() => {
    setLocalFollowing(isFollowing(userId));
  }, [userId]);

  if (!user || user.id === userId) {
    return null;
  }

  const handleFollow = async () => {
    setLoading(true);
    try {
      const newState = await toggleFollow(userId);
      if (newState !== undefined) {
        setLocalFollowing(newState);
      } else {
        // Sync with hook state if toggle didn't return explicit value
        setLocalFollowing(isFollowing(userId));
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      // Revert to hook state on error
      setLocalFollowing(isFollowing(userId));
    } finally {
      setLoading(false);
    }
  };

  // Sync local state with hook on mount and when userId changes
  useEffect(() => {
    setLocalFollowing(isFollowing(userId));
  }, [userId, isFollowing]);

  const isFollowingUser = isFollowing(userId) || localFollowing;

  if (variant === 'compact') {
    return (
      <motion.button
        onClick={handleFollow}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-full border transition-all ${
          isFollowingUser
            ? 'border-green-500/50 bg-green-500/10 text-green-400'
            : 'border-slate-700 bg-slate-800/50 text-slate-200 hover:border-amber/50'
        } disabled:opacity-50 ${className}`}
        aria-label={isFollowingUser ? 'Unfollow' : 'Follow'}
      >
        {isFollowingUser ? (
          <UserCheck size={16} />
        ) : (
          <UserPlus size={16} />
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleFollow}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all disabled:opacity-50 ${
        isFollowingUser
          ? 'border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20'
          : 'bg-gradient-to-r from-ember to-amber text-white hover:shadow-ember'
      } ${className}`}
      aria-label={isFollowingUser ? 'Unfollow' : 'Follow'}
    >
      {isFollowingUser ? (
        <>
          <UserCheck size={18} />
          <span>Following</span>
        </>
      ) : (
        <>
          <UserPlus size={18} />
          <span>Follow</span>
        </>
      )}
    </motion.button>
  );
}

