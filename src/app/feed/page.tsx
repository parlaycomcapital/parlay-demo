'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/lib/supabaseClient';
import { FeedSkeleton } from '@/components/SkeletonLoader';
import { RoleBadge } from '@/components/RoleBadge';
import { useToast } from '@/components/Toast';

export default function Feed() {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<any[]>([]);
  const { toasts, showToast, removeToast } = useToast();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            author:users(name, email, role, avatar_url)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch user purchases
  useEffect(() => {
    if (session?.user?.id) {
      const fetchPurchases = async () => {
        const { data } = await supabase
          .from('purchases')
          .select('post_id')
          .eq('user_id', session.user.id);
        setPurchases(data || []);
      };
      fetchPurchases();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    let filtered = posts;

    // Filter by price type
    if (filter === 'free') {
      filtered = filtered.filter(post => !post.is_premium);
    } else if (filter === 'premium') {
      filtered = filtered.filter(post => post.is_premium);
    }

    // Filter by sport
    if (sportFilter !== 'all') {
      filtered = filtered.filter(post => post.sport.toLowerCase() === sportFilter.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else { // popular - using price as proxy for popularity
        return b.price - a.price;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, filter, sportFilter, sortBy, searchQuery]);

  const handlePurchase = async (postId: string) => {
    if (!session?.user?.id) {
      showToast('Please log in to purchase posts', 'error');
      return;
    }

    try {
      const { error } = await supabase
        .from('purchases')
        .insert({
          user_id: session.user.id,
          post_id: postId,
        });

      if (error) throw error;
      
      showToast('Purchase successful! Content unlocked.', 'success');
      
      // Refresh purchases
      const { data } = await supabase
        .from('purchases')
        .select('post_id')
        .eq('user_id', session.user.id);
      setPurchases(data || []);
    } catch (err) {
      showToast('Failed to purchase post', 'error');
    }
  };

  const isPostPurchased = (postId: string): boolean => {
    return purchases.some(purchase => purchase.post_id === postId);
  };

  const canViewPost = (post: Post): boolean => {
    if (!post.is_premium) return true;
    if (!session?.user?.id) return false;
    return isPostPurchased(post.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <FeedSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Sports Analysis Feed
          </h1>
          <p className="text-gray-300 text-lg">
            Discover expert insights and predictions from top analysts
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search posts, authors..."
            className="w-full sm:w-1/3 px-4 py-2 rounded-xl bg-slate/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent font-body"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex space-x-4">
            {/* Filter by Price */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'free' | 'premium')}
              className="px-4 py-2 rounded-xl bg-slate/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent font-body"
            >
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>

            {/* Filter by Sport */}
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent font-body"
            >
              <option value="all">All Sports</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="esports">Esports</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="px-4 py-2 rounded-xl bg-slate/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent font-body"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative bg-slate/50 rounded-2xl shadow-lg overflow-hidden group hover:scale-[1.02] hover:shadow-xl hover:shadow-ember/20 transition-all duration-300"
            >
              {!canViewPost(post) && (
                <div className="absolute inset-0 bg-navy/80 flex items-center justify-center z-10 rounded-2xl">
                  <div className="text-center">
                    <p className="text-white text-lg font-semibold mb-2">Premium Content</p>
                    <button
                      onClick={() => handlePurchase(post.id)}
                      className="bg-gradient-ember text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                      Purchase to Unlock
                    </button>
                  </div>
                </div>
              )}
              <Link href={`/post/${post.id}`} className="block">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image_url || '/placeholder-sports.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end">
                    <h2 className="text-xl font-heading font-bold text-white line-clamp-2">
                      {post.title}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.is_premium ? 'bg-amber text-navy' : 'bg-green-500 text-white'}`}>
                      {post.is_premium ? '🔥 Premium' : '✓ Free'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white/80 text-sm mb-3 line-clamp-3 font-body">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.author?.avatar_url || `https://ui-avatars.com/api/?name=${post.author?.name}&background=FF6B35&color=fff`}
                        alt={post.author?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <Link href={`/profile/${post.author_id}`} className="text-amber hover:underline font-body">
                        {post.author?.name}
                      </Link>
                      <RoleBadge role={post.author?.role || 'fan'} />
                    </div>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
              <Link href={`/post/${post.id}`} className="absolute inset-0 flex items-center justify-center bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-2xl">
                <button className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-opacity">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}