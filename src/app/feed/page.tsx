'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { usePurchases } from '@/hooks/usePurchases';
import { Post } from '@/lib/localStorage';
import { FeedSkeleton } from '@/components/SkeletonLoader';
import { RoleBadge } from '@/components/RoleBadge';
import { useToast } from '@/components/Toast';

export default function Feed() {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isLoggedIn } = useUser();
  const { posts, loading: postsLoading } = usePosts();
  const { isPostPurchased, buyPost } = usePurchases();
  const { toasts, showToast, removeToast } = useToast();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    let filtered = posts;

    // Filter by price type
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

    // Filter by sport
    if (sportFilter !== 'all') {
      filtered = filtered.filter(post => post.sport.toLowerCase() === sportFilter.toLowerCase());
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likes + b.views + b.comments) - (a.likes + a.views + a.comments);
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredPosts(filtered);
  }, [posts, filter, sportFilter, sortBy, searchQuery]);

  const handlePurchase = (postId: string) => {
    if (user) {
      buyPost(postId, user.id);
      showToast('Purchase successful! Content unlocked.', 'success');
    }
  };

  const canViewPost = (post: Post): boolean => {
    if (!post.isPremium) return true;
    if (!isLoggedIn) return false;
    return isPostPurchased(post.id, user?.id || '');
  };

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-700 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>
          <FeedSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B]">
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <div key={toast.id} className="fixed top-4 right-4 z-50">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm animate-in slide-in-from-right duration-300">
            <span className="text-lg">✅</span>
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      
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

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search analyses, authors, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4">
            {/* Price Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'all'
                    ? 'bg-gradient-ember text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All ({posts.length})
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'free'
                    ? 'bg-gradient-ember text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Free ({posts.filter(p => !p.isPremium).length})
              </button>
              <button
                onClick={() => setFilter('premium')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === 'premium'
                    ? 'bg-gradient-ember text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Premium ({posts.filter(p => p.isPremium).length})
              </button>
            </div>

            {/* Sport Filter */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Sports</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="hockey">Hockey</option>
              <option value="baseball">Baseball</option>
              <option value="soccer">Soccer</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const canView = canViewPost(post);
            const isOwnPost = user?.id === post.authorId;

            return (
              <div key={post.id} className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 hover:shadow-xl hover:scale-105 transition-all duration-300 relative group">
                <div className="relative h-48">
                  <Image
                    src={post.imageUrl}
                    alt={`${post.sport} analysis by ${post.author.username}`}
                    fill
                    className="object-cover"
                  />
                  {post.isPremium ? (
                    <div className="absolute top-4 right-4 bg-gradient-ember text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Premium
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Free
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={`/post/${post.id}`}
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.username}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-300">{post.author.username}</p>
                        <RoleBadge role={post.author.role} size="sm" />
                      </div>
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

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                      {isOwnPost && (
                        <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors w-full sm:w-auto">
                          Edit
                        </button>
                      )}
                      
                      {canView ? (
                        <Link
                          href={`/post/${post.id}`}
                          className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-center w-full sm:w-auto"
                        >
                          Read
                        </Link>
                      ) : post.isPremium && isLoggedIn ? (
                        <button
                          onClick={() => handlePurchase(post.id)}
                          className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                        >
                          ${post.price}
                        </button>
                      ) : (
                        <Link
                          href="/login"
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-500 transition-colors text-center w-full sm:w-auto"
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
