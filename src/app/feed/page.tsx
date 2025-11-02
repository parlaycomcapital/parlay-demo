'use client';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/feed/PostCard';
import ScrollReveal from '@/components/feed/ScrollReveal';
import { motion } from 'framer-motion';

export default function FeedPage() {
  const { posts, loading, error } = usePosts();

  if (loading) return (
    <section>
      <p className="text-slate-400 text-center mt-10">Loading analyses...</p>
    </section>
  );

  if (error) return (
    <section>
      <p className="text-red-400 text-center mt-10">Error: {error}</p>
    </section>
  );

  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-5 text-white"
      >
        Community Feed
      </motion.h1>

      <div className="space-y-6">
        {posts.map((post: any, index: number) => (
          <ScrollReveal key={post.id} delay={index * 0.1}>
            <PostCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}