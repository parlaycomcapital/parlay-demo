'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, FileText, DollarSign, TrendingUp, Shield, Flag } from 'lucide-react';
import { supabase, User, Post } from '@/lib/supabaseClient';
import { isPlaceholderMode, mockUsers, mockPosts } from '@/lib/mockData';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalRevenue: 0,
    totalGroups: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    
    if (status === 'authenticated') {
      const userRole = session?.user?.role;
      if (userRole !== 'admin') {
        router.push('/feed');
        return;
      }
      if (userRole === 'admin') {
        fetchStats();
      }
    }
  }, [status, session, router]);

  const fetchStats = async () => {
    setLoading(true);

    // Use mock stats in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats({
        totalUsers: mockUsers.length,
        totalPosts: mockPosts.length,
        totalRevenue: 12500.50,
        totalGroups: 3,
      });
      setLoading(false);
      return;
    }

    try {
      // Fetch stats from Supabase
      const [usersResult, postsResult, subscriptionsResult, groupsResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('posts').select('id', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('id', { count: 'exact', head: true }),
        supabase.from('groups').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        totalUsers: usersResult.count || 0,
        totalPosts: postsResult.count || 0,
        totalRevenue: (subscriptionsResult.count || 0) * 19.99, // Estimate
        totalGroups: groupsResult.count || 0,
      });
    } catch (error: any) {
      console.warn('Error fetching admin stats:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Logo variant="hero" className="mx-auto mb-6" />
          <p className="text-white text-xl">Crunching data…</p>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Logo variant="hero" className="mx-auto mb-6" />
          <p className="text-white text-xl mb-4">Access Denied</p>
          <p className="text-slatex-400 mb-6">Admin access required</p>
          <Link href="/feed" className="btn-grad">
            Go to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 lg:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield size={32} className="text-amber" />
          Admin Dashboard
        </h1>
        <p className="text-slatex-400 text-sm">
          Platform analytics and management tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users size={24} className="text-blue-400" />
            <h3 className="font-semibold text-white">Total Users</h3>
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <FileText size={24} className="text-green-400" />
            <h3 className="font-semibold text-white">Total Posts</h3>
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalPosts.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={24} className="text-amber" />
            <h3 className="font-semibold text-white">Total Revenue</h3>
          </div>
          <div className="text-3xl font-bold text-white">
            ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={24} className="text-purple-400" />
            <h3 className="font-semibold text-white">Total Groups</h3>
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalGroups.toLocaleString()}</div>
        </motion.div>
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/admin/users">
          <motion.div
            className="card card-hover p-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <Users size={32} className="text-blue-400" />
              <div>
                <h3 className="font-semibold text-white mb-1">User Management</h3>
                <p className="text-sm text-slatex-400">View, verify, and manage users</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link href="/admin/moderation">
          <motion.div
            className="card card-hover p-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <Flag size={32} className="text-red-400" />
              <div>
                <h3 className="font-semibold text-white mb-1">Content Moderation</h3>
                <p className="text-sm text-slatex-400">Review flagged content and posts</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}