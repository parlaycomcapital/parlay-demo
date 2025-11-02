'use client';

import { usePosts } from '@/hooks/usePosts';
import Composer from '@/components/feed/Composer';
import PostCard from '@/components/feed/PostCard';
import ScrollReveal from '@/components/feed/ScrollReveal';

export default function FeedPage() {
  const { posts, loading } = usePosts();

  return (
    <div className="container-narrow">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Feed</h1>
        <p className="text-slatex-400">Follow analysts, explore insights, and support your favorites.</p>
      </div>

      <Composer />

      {loading && <p className="text-slatex-400">Loading analyses…</p>}
      <div className="space-y-5">
        {posts.map((p: any, i: number) => (
          <ScrollReveal key={p.id} delay={i * 0.06}>
            <PostCard post={p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}