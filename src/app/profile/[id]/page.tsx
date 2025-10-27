'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { User, Post } from '@/lib/localStorage';

export default function Profile() {
  const params = useParams();
  const userId = params.id as string;

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const { user: currentUser } = useUser();
  const { getPostsByAuthor } = usePosts();

  useEffect(() => {
    // For demo purposes, we'll use the current user or create a mock user
    if (userId === currentUser?.id) {
      setProfileUser(currentUser);
    } else {
      // Create a mock user for demo
      const mockUser: User = {
        id: userId,
        username: `user_${userId}`,
        role: 'analyst',
        email: `user${userId}@example.com`,
        avatar: `https://ui-avatars.com/api/?name=User${userId}&background=FF6B35&color=fff`,
        bio: 'Professional sports analyst with years of experience',
        followers: Math.floor(Math.random() * 5000),
        following: Math.floor(Math.random() * 200),
        isAnalyst: true,
        isAdmin: false,
        joinDate: '2023-01-01',
      };
      setProfileUser(mockUser);
    }

    const posts = getPostsByAuthor(userId);
    setUserPosts(posts);
    setLoading(false);
  }, [userId, currentUser, getPostsByAuthor]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, this would make an API call
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">User not found</div>
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

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className="min-h-screen bg-[#0B132B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profileUser.avatar}
              alt={profileUser.username}
              className="w-24 h-24 rounded-full"
            />

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {profileUser.username}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-300 mb-4">
                    <span className="flex items-center">
                      <span className="text-orange-400 mr-1">🔥</span>
                      {profileUser.role === 'analyst' ? 'Analyst' : profileUser.role}
                    </span>
                    <span>Joined {new Date(profileUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{profileUser.bio}</p>
                </div>

                {!isOwnProfile && (
                  <button
                    onClick={handleFollow}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isFollowing
                        ? 'bg-gray-600 text-white hover:bg-gray-500'
                        : 'bg-gradient-ember text-white hover:opacity-90'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>

              <div className="flex space-x-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {profileUser.followers.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{profileUser.following}</div>
                  <div className="text-gray-400 text-sm">Following</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{userPosts.length}</div>
                  <div className="text-gray-400 text-sm">Analyses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {isOwnProfile ? 'Your Analyses' : `${profileUser.username}'s Analyses`}
          </h2>

          {userPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                {isOwnProfile ? "You haven't created any analyses yet" : 'No analyses found'}
              </div>
              {isOwnProfile && (
                <Link
                  href="/create"
                  className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block mt-4"
                >
                  Create Your First Analysis
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-colors"
                >
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
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.preview}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>👀 {post.views}</span>
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>

                      <div className="flex space-x-2">
                        {isOwnProfile && (
                          <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors">
                            Edit
                          </button>
                        )}

                        <Link
                          href={`/post/${post.id}`}
                          className="bg-gradient-ember text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
