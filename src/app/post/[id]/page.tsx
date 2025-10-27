'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { usePurchases } from '@/hooks/usePurchases';
import { Post } from '@/lib/localStorage';

export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [canView, setCanView] = useState(false);

  const { user, isLoggedIn } = useUser();
  const { getPostById } = usePosts();
  const { isPostPurchased, buyPost } = usePurchases();

  useEffect(() => {
    const foundPost = getPostById(postId);
    setPost(foundPost || null);

    if (foundPost) {
      const canViewPost = !foundPost.isPremium || isPostPurchased(postId, user?.id || '');
      setCanView(canViewPost);
    }

    setLoading(false);
  }, [postId, getPostById, isPostPurchased, user?.id, isLoggedIn]);

  const handlePurchase = () => {
    if (user && post) {
      buyPost(post.id, user.id);
      setCanView(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Post not found</div>
          <Link
            href="/feed"
            className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  const isOwnPost = user?.id === post.authorId;

  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/feed"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          ← Back to Feed
        </Link>

        {/* Post Header */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-white font-semibold">{post.author.username}</h2>
                <p className="text-gray-400 text-sm">
                  {post.sport} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {post.isPremium && (
              <div className="bg-gradient-ember text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Premium Analysis
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

          <div className="flex items-center space-x-6 text-gray-400 text-sm mb-6">
            <span>👀 {post.views} views</span>
            <span>❤️ {post.likes} likes</span>
            <span>💬 {post.comments} comments</span>
            {post.teams.length > 0 && <span>🏆 {post.teams.join(' vs ')}</span>}
          </div>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
          />
        </div>

        {/* Post Content */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          {canView ? (
            <div>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span>❤️</span>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span>💬</span>
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                </div>

                {isOwnPost && (
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Edit Post
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Content</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                This is a premium analysis. Purchase it to unlock the full content and insights.
              </p>

              {isLoggedIn ? (
                <button
                  onClick={handlePurchase}
                  className="bg-gradient-ember text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Purchase for ${post.price}
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-400">
                    You need to be logged in to purchase this analysis.
                  </p>
                  <Link
                    href="/login"
                    className="bg-gradient-ember text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity inline-block"
                  >
                    Login to Purchase
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="mt-8 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-white font-semibold text-lg">{post.author.username}</h3>
                <p className="text-gray-400">{post.author.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                  <span>{post.author.followers.toLocaleString()} followers</span>
                  <span>{post.author.following} following</span>
                </div>
              </div>
            </div>

            <Link
              href={`/profile/${post.authorId}`}
              className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
