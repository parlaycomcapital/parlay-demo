'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export default function CommentsDrawer({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.comment as HTMLInputElement;
    
    if (!input.value.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: input.value,
      author: 'You',
      timestamp: new Date().toLocaleTimeString(),
    };

    setComments([...comments, newComment]);
    input.value = '';
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="icon-btn flex items-center gap-1"
      >
        <MessageCircle size={18} />
        {comments.length > 0 && (
          <span className="text-xs text-slate-400">{comments.length}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20"
              onClick={() => setOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute z-30 left-0 top-10 w-72 bg-[#111C3B] border border-slate-800 rounded-xl shadow-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Comments</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={addComment} className="flex gap-2 mb-3">
                <input
                  name="comment"
                  placeholder="Add comment..."
                  className="flex-1 text-xs bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                <button 
                  type="submit"
                  className="text-amber-400 text-xs font-medium hover:text-amber-300 transition-colors px-2"
                >
                  Send
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="text-xs text-slate-300 bg-white/5 px-3 py-2 rounded-lg border border-slate-800"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{comment.author}</span>
                        <span className="text-slate-500">{comment.timestamp}</span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
