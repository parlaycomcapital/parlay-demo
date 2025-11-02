'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Lock } from 'lucide-react';
import CommentsDrawer from './CommentsDrawer';

export default function PostCard({ post }: { post: any }) {
  const premium = !!post.price;

  return (
    <motion.article
      className="card card-hover p-5"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <header className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-amber" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.title}</span>
            <span className="badge">{post.sport}</span>
            {premium && (
              <span className="badge flex items-center gap-1">
                <Lock size={12} />
                Premium
              </span>
            )}
          </div>
          <p className="text-xs text-slatex-500">{new Date(post.created_at).toLocaleString()}</p>
        </div>
      </header>

      <p className="text-slatex-300 leading-relaxed mb-4">{post.content}</p>

      <footer className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slatex-400">
          <motion.button
            className="icon-btn"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.1 }}
          >
            <Heart size={18} />
          </motion.button>
          <motion.button
            className="icon-btn"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.1 }}
          >
            <MessageCircle size={18} />
          </motion.button>
          <motion.button
            className="icon-btn"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.1 }}
          >
            <Share2 size={18} />
          </motion.button>
        </div>
        {premium && (
          <form action="/api/checkout" method="post">
            <input type="hidden" name="postId" value={post.id} />
            <input type="hidden" name="title" value={post.title} />
            <input type="hidden" name="price" value={post.price} />
            <button type="submit" className="btn-grad">
              Buy ${Number(post.price).toFixed(2)}
            </button>
          </form>
        )}
      </footer>
      <CommentsDrawer postId={post.id} />
    </motion.article>
  );
}