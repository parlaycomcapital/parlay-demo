'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string;
    avatar_url: string;
  };
  replies?: Comment[];
}

export function useComments(postId: string | null) {
  const { user } = useSupabaseAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles!comments_author_id_fkey(full_name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Build nested structure (max 2 levels)
      const commentsData = (data as Comment[]) || [];
      const topLevel = commentsData.filter((c) => !c.parent_id);
      
      const buildTree = (parentComments: Comment[]): Comment[] => {
        return parentComments.map((comment) => {
          const replies = commentsData.filter(
            (c) => c.parent_id === comment.id
          );
          return {
            ...comment,
            replies: replies.length > 0 ? buildTree(replies) : undefined,
          };
        });
      };

      setComments(buildTree(topLevel));
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async (
    content: string,
    parentId: string | null = null
  ) => {
    if (!user || !postId || !content.trim()) return null;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_id: user.id,
            content: content.trim(),
            parent_id: parentId,
          },
        ])
        .select(`
          *,
          author:profiles!comments_author_id_fkey(full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Refresh comments
      await fetchComments();

      return data as Comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('author_id', user.id);

      if (error) throw error;

      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    refresh: fetchComments,
  };
}

