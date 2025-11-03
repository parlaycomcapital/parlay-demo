'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from './useSupabaseAuth';

export interface Group {
  id: string;
  name: string;
  description: string | null;
  creator_id: string;
  cover_url: string | null;
  avatar_url: string | null;
  is_private: boolean;
  member_count: number;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  is_member?: boolean;
  user_role?: 'owner' | 'member' | 'admin';
}

export function useGroups(userId?: string) {
  const { user } = useSupabaseAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      // Fetch all public groups (or groups user is member of)
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          creator:profiles(id, full_name, avatar_url)
        `)
        .eq('is_private', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If user is logged in, check membership status
      if (user?.id) {
        const groupIds = data?.map(g => g.id) || [];
        if (groupIds.length > 0) {
          const { data: memberships } = await supabase
            .from('group_members')
            .select('group_id, role')
            .eq('user_id', user.id)
            .in('group_id', groupIds);

          // Add membership info to groups
          const groupsWithMembership = data?.map(group => {
            const membership = memberships?.find(m => m.group_id === group.id);
            return {
              ...group,
              is_member: !!membership,
              user_role: membership?.role as 'owner' | 'member' | 'admin' | undefined,
            };
          });

          setGroups(groupsWithMembership || []);
        } else {
          setGroups(data || []);
        }
      } else {
        setGroups(data || []);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();

    // Set up real-time subscription
    const channel = supabase
      .channel('groups-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'groups',
        },
        () => {
          fetchGroups();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'group_members',
        },
        () => {
          fetchGroups();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const createGroup = async (groupData: {
    name: string;
    description?: string;
    cover_url?: string;
    avatar_url?: string;
    is_private?: boolean;
  }) => {
    if (!user?.id) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('groups')
      .insert({
        ...groupData,
        creator_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const joinGroup = async (groupId: string) => {
    if (!user?.id) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: user.id,
        role: 'member',
      })
      .select()
      .single();

    if (error) throw error;
    await fetchGroups(); // Refresh groups
    return data;
  };

  const leaveGroup = async (groupId: string) => {
    if (!user?.id) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (error) throw error;
    await fetchGroups(); // Refresh groups
  };

  return {
    groups,
    loading,
    refresh: fetchGroups,
    createGroup,
    joinGroup,
    leaveGroup,
  };
}

