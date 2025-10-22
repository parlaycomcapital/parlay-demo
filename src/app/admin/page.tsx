'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { usePurchases } from '@/hooks/usePurchases';
import { resetAllData, initializeDemoData } from '@/lib/localStorage';
import { Post, User } from '@/lib/localStorage';
import Link from 'next/link';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, isLoggedIn, isAdmin } = useUser();
  const { posts: allPosts, removePost } = usePosts();
  const { purchases: allPurchases } = usePurchases();

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      return;
    }

    // Load demo users (in a real app, this would come from an API)
    const demoUsers: User[] = [
      {
        id: '1',
        username: 'alex_sports',
        role: 'analyst',
        email: 'alex@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Professional sports analyst',
        followers: 12500,
        following: 450,
        isAnalyst: true,
        isAdmin: false,
        joinDate: '2023-01-15'
      },
      {
        id: '2',
        username: 'sarah_tennis',
        role: 'analyst',
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        bio: 'Tennis expert',
        followers: 8900,
        following: 320,
        isAnalyst: true,
        isAdmin: false,
        joinDate: '2023-03-22'
      },
      {
        id: '3',
        username: 'mike_hockey',
        role: 'analyst',
        email: 'mike@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'NHL analyst',
        followers: 15600,
        following: 280,
        isAnalyst: true,
        isAdmin: false,
        joinDate: '2022-11-08'
      }
    ];

    setUsers(demoUsers);
    setPosts(allPosts);
    setPurchases(allPurchases);
    setLoading(false);
  }, [isLoggedIn, isAdmin, allPosts, allPurchases]);

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      removePost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This will delete all posts and purchases.')) {
      resetAllData();
      initializeDemoData();
      window.location.reload();
    }
  };

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Access Denied</div>
          <p className="text-gray-300 mb-6">Only admins can access this page</p>
          <Link
            href="/login"
            className="bg-gradient-ember text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
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
            Admin Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Manage users, posts, and platform data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-gray-400 text-sm">Total Users</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white">{posts.length}</div>
            <div className="text-gray-400 text-sm">Total Posts</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white">{posts.filter(p => p.isPremium).length}</div>
            <div className="text-gray-400 text-sm">Premium Posts</div>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white">{purchases.length}</div>
            <div className="text-gray-400 text-sm">Total Purchases</div>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 py-3">User</th>
                  <th className="text-left text-gray-300 py-3">Role</th>
                  <th className="text-left text-gray-300 py-3">Followers</th>
                  <th className="text-left text-gray-300 py-3">Posts</th>
                  <th className="text-left text-gray-300 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium">{user.username}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-red-600 text-white' :
                        user.role === 'analyst' ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">{user.followers.toLocaleString()}</td>
                    <td className="py-4 text-gray-300">{posts.filter(p => p.authorId === user.id).length}</td>
                    <td className="py-4 text-gray-300">{new Date(user.joinDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {posts.slice(0, 10).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium line-clamp-1">{post.title}</h3>
                    <p className="text-gray-400 text-sm">by {post.author.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>👀 {post.views}</span>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      {post.isPremium && <span className="text-orange-400">🔥 Premium</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/post/${post.id}`}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-500 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Actions</h2>
          <div className="space-y-4">
            <button
              onClick={handleResetData}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition-colors"
            >
              Reset All Data (Demo Only)
            </button>
            <p className="text-gray-400 text-sm">
              This will reset all posts and purchases to demo data. Use with caution!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
