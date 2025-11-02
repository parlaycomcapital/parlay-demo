'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, UserPlus, ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { isPlaceholderMode, mockGroups, mockPosts, PLACEHOLDER_GROUP_AVATAR } from '@/lib/mockData';
import { supabase, Group, Post } from '@/lib/supabaseClient';
import PostCard from '@/components/feed/PostCard';
import ScrollReveal from '@/components/feed/ScrollReveal';

export default function GroupPage() {
  const params = useParams();
  const groupId = params.id as string;
  const { data: session } = useSession();
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      fetchGroup();
      fetchPosts();
      checkMembership();
    }
  }, [groupId, session?.user?.id]);

  const fetchGroup = async () => {
    // Use mock groups in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const foundGroup = mockGroups.find(g => g.id === groupId) || mockGroups[0];
      setGroup(foundGroup as Group);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) throw error;
      setGroup(data);
    } catch (error: any) {
      console.warn('Error fetching group (placeholder mode fallback):', error.message);
      const foundGroup = mockGroups.find(g => g.id === groupId) || mockGroups[0];
      setGroup(foundGroup as Group);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    // Use mock posts in placeholder mode
    if (isPlaceholderMode()) {
      // Create mock posts with group_id
      const groupPosts = mockPosts
        .map((post, index) => index < 2 ? { ...post, group_id: groupId } : post)
        .filter(p => p.group_id === groupId) || mockPosts.slice(0, 2);
      setPosts(groupPosts as Post[]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:users(id, name, email, avatar_url)')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.warn('Error fetching posts (placeholder mode fallback):', error.message);
      const groupPosts = mockPosts.filter(p => p.group_id === groupId) || mockPosts.slice(0, 2);
      setPosts(groupPosts as Post[]);
    }
  };

  const checkMembership = async () => {
    if (!session?.user?.id) return;

    // In placeholder mode, set mock membership
    if (isPlaceholderMode()) {
      setIsMember(true);
      return;
    }

    try {
      const { data } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', session.user.id)
        .single();

      setIsMember(!!data);
    } catch (error) {
      setIsMember(false);
    }
  };

  const handleJoin = async () => {
    if (!session?.user?.id) {
      window.location.href = '/login?redirect=/groups/' + groupId;
      return;
    }

    // Placeholder mode: just update local state
    if (isPlaceholderMode()) {
      console.log('Placeholder mode: Joined group', groupId);
      setIsMember(true);
      if (group) {
        setGroup({ ...group, member_count: (group.member_count || 0) + 1 });
      }
      return;
    }

    try {
      const { error } = await supabase.from('group_members').insert({
        group_id: groupId,
        user_id: session.user.id,
        role: 'member',
      });

      if (error) throw error;
      setIsMember(true);
      if (group) {
        setGroup({ ...group, member_count: (group.member_count || 0) + 1 });
      }
    } catch (error: any) {
      console.warn('Error joining group:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="container-narrow text-center py-12">
        <p className="text-slatex-400">Loading group...</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container-narrow text-center py-12">
        <p className="text-slatex-400 mb-4">Group not found</p>
        <Link href="/groups" className="text-amber hover:underline">
          Back to Communities
        </Link>
      </div>
    );
  }

  return (
    <div className="container-narrow w-full">
      {/* Back button */}
      <Link
        href="/groups"
        className="inline-flex items-center gap-2 text-slatex-400 hover:text-amber transition mb-5 lg:mb-6"
      >
        <ArrowLeft size={18} />
        Back to Communities
      </Link>

      {/* Group header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden mb-5 lg:mb-6"
      >
        <div className="h-32 bg-gradient-to-r from-ember/60 to-amber/60" />
        <div className="p-5 lg:p-6 -mt-16 flex items-end gap-4">
          <div
            className="w-24 h-24 rounded-xl bg-navy-100 border-4 border-navy-100 shadow-ember flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{
              backgroundImage: group.avatar_url || PLACEHOLDER_GROUP_AVATAR
                ? `url(${group.avatar_url || PLACEHOLDER_GROUP_AVATAR})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!group.avatar_url && !PLACEHOLDER_GROUP_AVATAR && (
              <Users size={32} className="text-amber" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{group.name}</h1>
            <p className="text-slatex-300 mb-4">{group.description || 'No description'}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slatex-400">
                <Users size={18} />
                <span>{group.member_count || 0} members</span>
              </div>
              {group.is_public ? (
                <span className="badge">Public</span>
              ) : (
                <span className="badge bg-amber/20 text-amber">Private</span>
              )}
              {session?.user?.role === 'creator' && group.creator_id === session.user.id && (
                <span className="badge bg-ember/20 text-ember">Creator</span>
              )}
            </div>
          </div>
          {session?.user && !isMember && (
            <motion.button
              onClick={handleJoin}
              whileTap={{ scale: 0.95 }}
              className="btn-grad flex items-center gap-2 px-4 py-2 whitespace-nowrap"
            >
              <UserPlus size={18} />
              Join Group
            </motion.button>
          )}
          {isMember && (
            <span className="badge bg-green-500/20 text-green-400 px-4 py-2">
              Member
            </span>
          )}
        </div>
      </motion.div>

      {/* Group posts */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Posts</h2>
        {posts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slatex-400">No posts in this community yet</p>
          </div>
        ) : (
          <div className="space-y-5 lg:space-y-6">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.06}>
                <PostCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
