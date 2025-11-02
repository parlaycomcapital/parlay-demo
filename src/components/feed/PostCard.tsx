'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import CommentsDrawer from '@/components/feed/CommentsDrawer';

export default function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || Math.floor(Math.random() * 50));
  const [purchasing, setPurchasing] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setShareTooltip(true);
      setTimeout(() => setShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handlePurchase = async (postId: string, title: string, price: number) => {
    setPurchasing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, title, price }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Purchase failed:', err);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="card p-5"
    >
      <header className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-amber flex items-center justify-center font-semibold text-white">
          {post.sport?.[0]?.toUpperCase() || 'S'}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{post.title}</h2>
          <p className="text-xs text-slate-400">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </header>

      <p className="text-slate-300 leading-relaxed mb-4">{post.content}</p>

      <footer className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-slate-400">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleLike}
            className={`icon-btn flex items-center gap-1 transition-colors ${
              liked ? 'text-amber-400' : ''
            }`}
          >
            <Heart 
              size={18} 
              fill={liked ? '#F5A623' : 'none'}
              className={liked ? 'text-amber-400' : ''}
            />
            <span className="ml-1 text-xs">{likes}</span>
          </motion.button>

          <CommentsDrawer postId={post.id} />

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="icon-btn group relative"
              aria-label="Share post"
            >
              <Share2 size={18} />
            </motion.button>
            
            {shareTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-300 bg-slate-800 px-2 py-1 rounded-lg whitespace-nowrap border border-slate-700"
              >
                Link copied!
              </motion.div>
            )}
          </div>
        </div>

        {post.price && (
          <button
            onClick={() => handlePurchase(post.id, post.title, post.price)}
            disabled={purchasing}
            className="btn-primary text-sm px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {purchasing ? 'Processing...' : `Buy $${post.price}`}
          </button>
        )}
      </footer>
    </motion.article>
  );
}

