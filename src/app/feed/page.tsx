'use client';

import { usePosts } from '@/hooks/usePosts';
import Composer from '@/components/feed/Composer';
import PostCard from '@/components/feed/PostCard';
import ScrollReveal from '@/components/feed/ScrollReveal';
import PostCardSkeleton from '@/components/feed/PostCardSkeleton';
import { motion } from 'framer-motion';
import { fadeUp, staggerConfig } from '@/lib/motion';

export default function FeedPage() {
  const { posts, loading } = usePosts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-poppins font-semibold mb-2">Feed</h1>
        <p className="text-textSecondary text-[clamp(0.9rem,1vw,1.1rem)]">Follow analysts, explore insights, and support your favorites.</p>
      </div>

      <Composer />

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {posts.map((p: any, i: number) => (
            <motion.div key={p.id} variants={fadeUp} layout>
              <PostCard post={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}