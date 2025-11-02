'use client';

import { useState, useEffect } from 'react';
import { supabase, Notification } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';
import { isPlaceholderMode } from '@/lib/mockData';

export function useNotifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    fetchNotifications();

    // Set up real-time listener
    if (!isPlaceholderMode()) {
      const channel = supabase
        .channel(`notifications:${session.user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${session.user.id}`,
          },
          () => {
            fetchNotifications();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [session?.user?.id]);

  const fetchNotifications = async () => {
    if (!session?.user?.id) return;

    setLoading(true);

    // Use mock notifications in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const mockNotifications: Notification[] = [
        {
          id: 'notif1',
          user_id: session.user.id,
          type: 'like',
          actor_id: 'user1',
          post_id: 'post1',
          read: false,
          created_at: new Date().toISOString(),
          actor: {
            id: 'user1',
            email: 'demo@parlay.app',
            name: 'Demo Creator',
            role: 'creator' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
        {
          id: 'notif2',
          user_id: session.user.id,
          type: 'comment',
          actor_id: 'user2',
          post_id: 'post1',
          read: false,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          actor: {
            id: 'user2',
            email: 'follower@parlay.app',
            name: 'Demo Follower',
            role: 'follower' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
        {
          id: 'notif3',
          user_id: session.user.id,
          type: 'follow',
          actor_id: 'user3',
          read: true,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          actor: {
            id: 'user3',
            email: 'analyst@parlay.app',
            name: 'Sports Analyst',
            role: 'creator' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          actor:users(id, name, email, avatar_url)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount((data || []).filter(n => !n.read).length);
    } catch (error: any) {
      console.warn('Error fetching notifications:', error.message);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (isPlaceholderMode()) {
      setNotifications(prev =>
        prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      return;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
      fetchNotifications();
    } catch (error: any) {
      console.warn('Error marking notification as read:', error.message);
    }
  };

  const markAllAsRead = async () => {
    if (!session?.user?.id) return;

    if (isPlaceholderMode()) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      return;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', session.user.id)
        .eq('read', false);

      if (error) throw error;
      fetchNotifications();
    } catch (error: any) {
      console.warn('Error marking all as read:', error.message);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
