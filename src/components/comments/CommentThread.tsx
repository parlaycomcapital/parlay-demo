'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Reply, Trash2 } from 'lucide-react';
import { useComments, Comment } from '@/hooks/useComments';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

interface CommentThreadProps {
  postId: string;
  maxDepth?: number;
}

interface CommentItemProps {
  comment: Comment;
  depth: number;
  maxDepth: number;
  postId: string;
  onReply: (parentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

function CommentItem({
  comment,
  depth,
  maxDepth,
  postId,
  onReply,
  onDelete,
}: CommentItemProps) {
  const { user } = useSupabaseAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const replyInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isReplying && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [isReplying]);

  const handleReply = async () => {
    if (!replyContent.trim() || isDeleting) return;

    try {
      await onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    if (!confirm('Delete this comment?')) return;

    setIsDeleting(true);
    try {
      await onDelete(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setIsDeleting(false);
    }
  };

  const canReply = depth < maxDepth;
  const isAuthor = user?.id === comment.author_id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${depth > 0 ? 'ml-8 mt-3 pl-4 border-l-2 border-slate-800' : ''}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 overflow-hidden">
            {comment.author?.avatar_url ? (
              <Image
                src={comment.author.avatar_url}
                alt={comment.author.full_name || 'User'}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white">
                {comment.author?.full_name?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white">
              {comment.author?.full_name || 'Anonymous'}
            </span>
            <span className="text-xs text-textSecondary">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-textPrimary mb-2 whitespace-pre-wrap">
            {comment.content}
          </p>
          <div className="flex items-center gap-4">
            {canReply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-amber transition-colors"
              >
                <Reply size={14} />
                Reply
              </button>
            )}
            {isAuthor && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-red-400 transition-colors disabled:opacity-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </div>

          {/* Reply form */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <textarea
                  ref={replyInputRef}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber/50 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleReply();
                    }
                  }}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleReply}
                    disabled={!replyContent.trim() || isDeleting}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-ember to-amber text-white text-sm font-medium hover:shadow-ember transition-all disabled:opacity-50"
                  >
                    Post Reply
                  </button>
                  <button
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent('');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
              postId={postId}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function CommentThread({
  postId,
  maxDepth = 2,
}: CommentThreadProps) {
  const { user } = useSupabaseAuth();
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addComment(newComment, null);
      setNewComment('');

      // Create notification
      if (user) {
        // Get post author
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
              type: 'comment',
              entity_id: postId,
              entity_type: 'post',
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    try {
      const reply = await addComment(content, parentId);

      // Create reply notification
      if (user && reply) {
        const parentComment = comments
          .flatMap((c) => [c, ...(c.replies || [])])
          .find((c) => c.id === parentId);

        if (parentComment && parentComment.author_id !== user.id) {
          await supabase.from('notifications').insert([
            {
              recipient_id: parentComment.author_id,
              sender_id: user.id,
              type: 'reply',
              entity_id: parentId,
              entity_type: 'comment',
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Error replying to comment:', error);
      throw error;
    }
  };

  return (
    <div className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={20} className="text-amber" />
        <h3 className="text-lg font-semibold text-white">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>

      {/* Comment input */}
      {user ? (
        <div className="mb-6">
          <textarea
            ref={textareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber/50 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-end mt-2">
            <motion.button
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-ember transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </motion.button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-textSecondary mb-6">
          <a href="/auth" className="text-amber hover:underline">
            Sign in
          </a>{' '}
          to comment
        </p>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-textSecondary">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-textSecondary">No comments yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              maxDepth={maxDepth}
              postId={postId}
              onReply={handleReply}
              onDelete={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

