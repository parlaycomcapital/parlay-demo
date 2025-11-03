'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, ArrowLeft, Sparkles, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useGroups } from '@/hooks/useGroups';
import PostCard from '@/components/feed/PostCard';

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const { user, isAuthenticated } = useSupabaseAuth();
  const { joinGroup, leaveGroup, refresh } = useGroups();
  
  const [group, setGroup] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [userRole, setUserRole] = useState<'owner' | 'member' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (groupId) {
      loadGroup();
      loadPosts();
      checkMembership();
    }
  }, [groupId, user?.id]);

  const loadGroup = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          creator:profiles(id, full_name, avatar_url)
        `)
        .eq('id', groupId)
        .single();

      if (error) throw error;
      setGroup(data);
    } catch (error: any) {
      console.error('Error loading group:', error);
      router.push('/groups');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(id, full_name, avatar_url, role)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const checkMembership = async () => {
    if (!user?.id) {
      setIsMember(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('group_members')
        .select('role')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsMember(!!data);
      setUserRole(data?.role as 'owner' | 'member' | 'admin' || null);
    } catch (error: any) {
      console.error('Error checking membership:', error);
      setIsMember(false);
    }
  };

  const handleJoin = async () => {
    if (!isAuthenticated) {
      router.push('/auth?redirect=/groups/' + groupId);
      return;
    }

    setJoining(true);
    try {
      await joinGroup(groupId);
      await checkMembership();
      await loadGroup(); // Refresh to update member count
    } catch (error: any) {
      console.error('Error joining group:', error);
      alert(error.message || 'Failed to join group');
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm('Are you sure you want to leave this group?')) return;

    try {
      await leaveGroup(groupId);
      await checkMembership();
      await loadGroup(); // Refresh to update member count
    } catch (error: any) {
      console.error('Error leaving group:', error);
      alert(error.message || 'Failed to leave group');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
        <div className="max-w-6xl mx-auto text-center py-20">
          <p className="text-slate-400 text-lg">Loading group...</p>
        </div>
      </main>
    );
  }

  if (!group) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
        <div className="max-w-6xl mx-auto text-center py-20">
          <p className="text-slate-400 mb-4">Group not found</p>
          <Link href="/groups" className="text-amber hover:underline">
            Back to Groups
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Back button */}
        <Link
          href="/groups"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-amber transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Groups
        </Link>

        {/* Group Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 overflow-hidden mb-10"
        >
          {/* Cover */}
          {group.cover_url ? (
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${group.cover_url})` }}
            />
          ) : (
            <div className="h-48 bg-gradient-to-br from-ember/40 to-amber/40" />
          )}

          <div className="p-8 -mt-16 flex flex-col md:flex-row items-end md:items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl bg-card border-4 border-card shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              {group.avatar_url ? (
                <img src={group.avatar_url} alt={group.name} className="w-full h-full object-cover" />
              ) : (
                <Users size={48} className="text-amber opacity-50" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-poppins font-semibold text-white mb-2">
                    {group.name}
                  </h1>
                  {group.description && (
                    <p className="text-slate-300 text-lg mb-4">{group.description}</p>
                  )}
                </div>
              </div>

              {/* Stats & Badges */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users size={20} />
                  <span className="font-medium">{group.member_count || 0} members</span>
                </div>
                {group.is_private ? (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber/20 text-amber text-sm">
                    <Lock size={14} />
                    Private
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/50 text-slate-400 text-sm">
                    <Globe size={14} />
                    Public
                  </div>
                )}
                {isMember && userRole && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber/20 text-amber text-sm">
                    <Sparkles size={14} />
                    {userRole === 'owner' ? 'Owner' : 'Member'}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isAuthenticated && (
              <div className="flex gap-3">
                {!isMember ? (
                  <motion.button
                    onClick={handleJoin}
                    disabled={joining}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <UserPlus size={20} />
                    {joining ? 'Joining...' : 'Join Group'}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleLeave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Leave Group
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div>
          <h2 className="text-2xl font-poppins font-semibold text-white mb-6">Group Posts</h2>
          
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-12 text-center"
            >
              <Users size={48} className="text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No posts yet in this group</p>
              <p className="text-slate-500 text-sm">
                {isMember ? 'Be the first to share an insight!' : 'Join to start contributing'}
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-8">
              <AnimatePresence mode="popLayout">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <PostCard post={post} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
