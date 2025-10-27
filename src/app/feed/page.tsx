'use client';
import { usePosts } from '@/hooks/usePosts';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/helpers';
import { useState } from 'react';

export default function FeedPage() {
  const { posts, loading, error } = usePosts();
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = async (postId: string, title: string, price: number) => {
    setPurchasing(postId);
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
      setPurchasing(null);
    }
  };

  if (loading) return (
    <div className="p-6 max-w-3xl mx-auto">
      <p className="text-slate-400 text-center mt-10">Loading posts...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 max-w-3xl mx-auto">
      <p className="text-red-400 text-center mt-10">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Latest Analyses</h1>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-ember to-amber rounded-full flex items-center justify-center font-bold text-white">
                  {post.sport[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                  <p className="text-xs text-slate-400">{formatDate(post.created_at)}</p>
                </div>
                    </div>
              <p className="text-slate-300">{post.content}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-3 text-slate-400">
                  <button className="icon-btn">
                    <Heart size={18} />
                  </button>
                  <button className="icon-btn">
                    <MessageCircle size={18} />
                  </button>
                  <button className="icon-btn">
                    <Share2 size={18} />
                  </button>
                </div>
                {post.price && (
                  <button
                    onClick={() => handlePurchase(post.id, post.title, post.price!)}
                    disabled={purchasing === post.id}
                    className="btn-primary text-sm px-3 py-2 disabled:opacity-50"
                  >
                    {purchasing === post.id ? 'Processing...' : `Buy for $${post.price}`}
                </button>
                )}
            </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}