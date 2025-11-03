'use client';

import { usePosts } from '@/hooks/usePosts';
import Composer from '@/components/feed/Composer';
import PostCard from '@/components/feed/PostCard';
import PostCardSkeleton from '@/components/feed/PostCardSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function FeedPage() {
  const { posts, loading } = usePosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 md:px-8 py-10">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-semibold mb-2 text-white">
            Feed
          </h1>
          <p className="text-slate-400 text-[clamp(0.9rem,1vw,1.1rem)]">
            Follow analysts, explore insights, and support your favorites.
          </p>
        </motion.div>

        {/* Composer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Composer />
        </motion.div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-slate-400 mt-20 py-20"
          >
            <div className="w-16 h-16 mb-4 relative">
              <Image
                src="/assets/brand/optimized/logo-transparent@2x.webp"
                alt="Parlay"
                fill
                className="opacity-50"
                sizes="64px"
              />
            </div>
            <p className="mt-4 text-slate-500 text-center max-w-md">
              No insights yet. Follow analysts or create your first post.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {posts.map((post: any, i: number) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.35, 
                  delay: i * 0.05,
                  layout: { duration: 0.3 }
                }}
              >
                <PostCard post={post} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}