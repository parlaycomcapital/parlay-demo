'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, MessageCircle } from 'lucide-react';
import { supabase, Comment } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

interface CommentsDrawerProps {
  postId: string;
}

export default function CommentsDrawer({ postId }: CommentsDrawerProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchComments();
      subscribeToComments();
    }

    return () => {
      const channel = supabase.channel(`comments:${postId}`);
      supabase.removeChannel(channel);
    };
  }, [open, postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:users(id, name, email, avatar_url)
        `)
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch replies for each comment
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: replies } = await supabase
            .from('comments')
            .select(`
              *,
              user:users(id, name, email, avatar_url)
            `)
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });

          return { ...comment, replies: replies || [] };
        })
      );

      setComments(commentsWithReplies as Comment[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToComments = () => {
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !newComment.trim()) return;

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: postId,
        user_id: session.user.id,
        parent_id: replyingTo || null,
        content: newComment.trim(),
      });

      if (error) throw error;

      // Create notification if replying to a comment
      if (replyingTo) {
        const { data: parentComment } = await supabase
          .from('comments')
          .select('user_id')
          .eq('id', replyingTo)
          .single();

        if (parentComment && parentComment.user_id !== session.user.id) {
          await supabase.from('notifications').insert({
            user_id: parentComment.user_id,
            type: 'comment',
            actor_id: session.user.id,
            post_id: postId,
            comment_id: replyingTo,
          });
        }
      } else {
        // Notify post author
        const { data: post } = await supabase
          .from('posts')
          .select('author_id')
          .eq('id', postId)
          .single();

        if (post && post.author_id !== session.user.id) {
          await supabase.from('notifications').insert({
            user_id: post.author_id,
            type: 'comment',
            actor_id: session.user.id,
            post_id: postId,
          });
        }
      }

      setNewComment('');
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="mt-3">
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-amber hover:underline text-sm transition"
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={16} />
        {open ? 'Hide' : 'Show'} comments
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <div className="rounded-xl border border-slate-800 bg-navy-300/50 p-4 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {session ? (
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyingTo ? 'Write a reply...' : 'Write a comment...'}
                    className="input flex-1 text-sm"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="icon-btn"
                    disabled={!newComment.trim()}
                  >
                    <Send size={18} />
                  </motion.button>
                </form>
              ) : (
                <p className="text-slatex-400 text-sm mb-4">
                  <a href="/login" className="text-amber hover:underline">
                    Sign in
                  </a>{' '}
                  to comment
                </p>
              )}

              {loading ? (
                <p className="text-slatex-400 text-sm text-center py-4">Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className="text-slatex-400 text-sm text-center py-4">No comments yet</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      postId={postId}
                      onReply={() => setReplyingTo(comment.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CommentItem({
  comment,
  postId,
  onReply,
}: {
  comment: Comment;
  postId: string;
  onReply: () => void;
}) {
  const { data: session } = useSession();
  
  // Note: Comment likes would need a separate hook or implementation
  // For now, we'll keep it simple
  const [liked, setLiked] = useState(false);
  
  const toggleLike = async () => {
    if (!session?.user?.id) return;
    setLiked(!liked);
    // TODO: Implement comment liking
  };

  return (
    <div className="border-b border-slate-800 pb-3 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember to-amber flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-white">
              {comment.user?.name || comment.user?.email || 'Anonymous'}
            </span>
            <span className="text-xs text-slatex-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-slatex-300 text-sm mb-2">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 text-xs text-slatex-400 hover:text-amber transition ${
                liked ? 'text-amber' : ''
              }`}
            >
              <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
              {comment.likes_count || 0}
            </button>
            {session && (
              <button
                onClick={onReply}
                className="text-xs text-slatex-400 hover:text-amber transition"
              >
                Reply
              </button>
            )}
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 ml-4 space-y-3 border-l-2 border-slate-800 pl-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ember to-amber flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-xs text-white">
                        {reply.user?.name || reply.user?.email || 'Anonymous'}
                      </span>
                      <span className="text-xs text-slatex-500">
                        {new Date(reply.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slatex-300 text-xs">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}