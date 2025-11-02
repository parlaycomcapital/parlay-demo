'use client';

import { usePosts } from '@/hooks/usePosts';
import Composer from '@/components/feed/Composer';
import PostCard from '@/components/feed/PostCard';
import ScrollReveal from '@/components/feed/ScrollReveal';
import PostCardSkeleton from '@/components/feed/PostCardSkeleton';

export default function FeedPage() {
  const { posts, loading } = usePosts();

  return (
    <div>
      <div className="mb-5 lg:mb-6">
        <h1 className="text-2xl font-bold mb-2">Feed</h1>
        <p className="text-slatex-400 text-sm">Follow analysts, explore insights, and support your favorites.</p>
      </div>

      <Composer />

      {loading ? (
        <div className="space-y-5 lg:space-y-6">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-5 lg:space-y-6">
          {posts.map((p: any, i: number) => (
            <ScrollReveal key={p.id} delay={i * 0.06}>
              <PostCard post={p} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}