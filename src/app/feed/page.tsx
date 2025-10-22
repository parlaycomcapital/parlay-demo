'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { usePurchases } from '@/hooks/usePurchases';
import { Post } from '@/lib/localStorage';

export default function Feed() {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const { user, isLoggedIn } = useUser();
  const { posts, loading: postsLoading } = usePosts();
  const { isPostPurchased, buyPost } = usePurchases();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    let filtered = posts;

    switch (filter) {
      case 'free':
        filtered = posts.filter(post => !post.isPremium);
        break;
      case 'premium':
        filtered = posts.filter(post => post.isPremium);
        break;
      default:
        filtered = posts;
    }

    setFilteredPosts(filtered);
  }, [posts, filter]);

  const handlePurchase = (postId: string) => {
    if (user) {
      buyPost(postId, user.id);
      // Show success message (you could add a toast notification here)
    }
  };

  const canViewPost = (post: Post): boolean => {
    if (!post.isPremium) return true;
    if (!isLoggedIn) return false;
    return isPostPurchased(post.id, user?.id || '');
  };

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sports Analysis Feed
          </h1>
          <p className="text-gray-300 text-lg">
            Discover expert insights and predictions from top analysts
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-ember text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Posts ({posts.length})
            </button>
            <button
              onClick={() => setFilter('free')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === 'free'
                  ? 'bg-gradient-ember text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Free ({posts.filter(p => !p.isPremium).length})
            </button>
            <button
              onClick={() => setFilter('premium')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === 'premium'
                  ? 'bg-gradient-ember text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Premium ({posts.filter(p => p.isPremium).length})
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const canView = canViewPost(post);
            const isOwnPost = user?.id === post.authorId;

            return (
              <div key={post.id} className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-colors relative">
                <div className="relative h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-ember text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Premium
                    </div>
                  )}
                  {!canView && !isOwnPost && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🔒</div>
                        <p className="text-sm">Premium Content</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm text-gray-300">{post.author.name}</p>
                      <p className="text-xs text-gray-400">{post.sport}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  
                  {canView ? (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.preview}</p>
                  ) : (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      Premium content - purchase to view full analysis
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>👀 {post.views}</span>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>

                    <div className="flex space-x-2">
                      {isOwnPost && (
                        <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors">
                          Edit
                        </button>
                      )}
                      
                      {canView ? (
                        <Link
                          href={`/post/${post.id}`}
                          className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Read
                        </Link>
                      ) : post.isPremium && isLoggedIn ? (
                        <button
                          onClick={() => handlePurchase(post.id)}
                          className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          ${post.price}
                        </button>
                      ) : (
                        <Link
                          href="/login"
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-500 transition-colors"
                        >
                          Login to Buy
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No posts found</div>
            <p className="text-gray-500 text-sm mt-2">
              {filter === 'premium' ? 'No premium posts available' : 'No posts match your filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
