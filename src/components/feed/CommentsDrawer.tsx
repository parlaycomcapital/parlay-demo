'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, MessageCircle, X } from 'lucide-react';
import { supabase, Comment } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';
import { isPlaceholderMode, PLACEHOLDER_AVATAR } from '@/lib/mockData';

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
      if (!isPlaceholderMode()) {
        subscribeToComments();
      }
    }

    return () => {
      if (!isPlaceholderMode()) {
        const channel = supabase.channel(`comments:${postId}`);
        supabase.removeChannel(channel);
      }
    };
  }, [open, postId]);

  const fetchComments = async () => {
    setLoading(true);
    
    // Use mock comments in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setComments([
        {
          id: 'comment1',
          post_id: postId,
          user_id: 'user1',
          content: 'Great analysis! Looking forward to seeing how this plays out.',
          likes_count: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: 'user1',
            email: 'demo@parlay.app',
            name: 'Demo Creator',
            role: 'creator' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          replies: [],
        },
        {
          id: 'comment2',
          post_id: postId,
          user_id: 'user2',
          content: 'I agree with your predictions. The stats back this up perfectly.',
          likes_count: 1,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          updated_at: new Date(Date.now() - 3600000).toISOString(),
          user: {
            id: 'user2',
            email: 'follower@parlay.app',
            name: 'Demo Follower',
            role: 'follower' as const,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            updated_at: new Date(Date.now() - 3600000).toISOString(),
          },
          replies: [],
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, user:users(*)')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
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
    if (!newComment.trim() || !session?.user) return;

    // Placeholder mode: add to local state
    if (isPlaceholderMode()) {
      const comment: Comment = {
        id: `comment${Date.now()}`,
        post_id: postId,
        user_id: session.user.id,
        content: newComment,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.name || '',
          role: (session.user.role as 'creator' | 'follower' | 'admin') || 'follower',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment('');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: session.user.id,
          content: newComment,
        })
        .select()
        .single();

      if (error) throw error;
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-slatex-400 hover:text-amber transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open comments"
      >
        <MessageCircle size={18} strokeWidth={2} />
        <span className="font-medium">{comments.length || 0}</span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Drawer Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-0 md:top-0 md:w-96 h-[85vh] md:h-screen bg-slate-900/95 backdrop-blur-md border-t md:border-t-0 md:border-l border-slate-800 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-semibold text-white">
                  Comments ({comments.length})
                </h3>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slatex-400 hover:text-white transition-colors"
                  aria-label="Close comments"
                >
                  <X size={24} strokeWidth={2} />
                </motion.button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {loading ? (
                  <div className="text-center text-slatex-400 py-8">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-center text-slatex-400 py-8">
                    <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      {/* Avatar */}
                      <div 
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 flex-shrink-0"
                        style={{
                          backgroundImage: PLACEHOLDER_AVATAR ? `url(${PLACEHOLDER_AVATAR})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {!PLACEHOLDER_AVATAR && (
                          <span className="text-xs font-bold text-amber">
                            {(comment.user?.name || 'U')[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-white">
                              {comment.user?.name || 'Anonymous'}
                            </span>
                            <span className="text-xs text-slatex-500">
                              {new Date(comment.created_at).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-slatex-300 whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-2 ml-2">
                          <button className="flex items-center gap-1 text-xs text-slatex-500 hover:text-ember transition-colors">
                            <Heart size={14} strokeWidth={2} />
                            <span>{comment.likes_count || 0}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Comment Input */}
              {session?.user && (
                <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-slate-900/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slatex-500 focus:outline-none focus:ring-2 focus:ring-amber/50"
                    />
                    <motion.button
                      type="submit"
                      disabled={!newComment.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-ember to-amber text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send comment"
                    >
                      <Send size={20} strokeWidth={2} />
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}