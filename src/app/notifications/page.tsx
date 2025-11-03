'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fadeUp, stagger } from '@/lib/motion';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/lib/supabaseClient';
import { Check, CheckCheck, Heart, MessageSquare, UserPlus, Reply } from 'lucide-react';
import Image from 'next/image';

function getNotificationMessage(notification: Notification): string {
  const senderName = notification.sender?.full_name || 'Someone';
  
  switch (notification.type) {
    case 'like':
      return `${senderName} liked your post`;
    case 'comment':
      return `${senderName} commented on your post`;
    case 'follow':
      return `${senderName} started following you`;
    case 'reply':
      return `${senderName} replied to your comment`;
    default:
      return 'New notification';
  }
}

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'like':
      return <Heart size={18} className="text-red-400" />;
    case 'comment':
      return <MessageSquare size={18} className="text-amber" />;
    case 'follow':
      return <UserPlus size={18} className="text-blue-400" />;
    case 'reply':
      return <Reply size={18} className="text-amber" />;
    default:
      return null;
  }
}

function getNotificationLink(notification: Notification): string | null {
  if (!notification.entity_id || !notification.entity_type) return null;

  switch (notification.entity_type) {
    case 'post':
      return `/post/${notification.entity_id}`;
    case 'comment':
      return `/post/${notification.entity_id}`; // Navigate to post and scroll to comment
    case 'user':
      return `/profile/${notification.entity_id}`;
    default:
      return null;
  }
}

export default function NotificationsPage() {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (!user && !loading) {
      router.push('/auth?redirect=/notifications');
    }
  }, [user, loading, router]);

  if (!user) {
    return null;
  }

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  const handleNotificationClick = async (notification: Notification) => {
    await markAsRead(notification.id);
    
    const link = getNotificationLink(notification);
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="container-narrow">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1, 0.06)}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.h1 variants={fadeUp} className="text-3xl font-bold text-white">
            Notifications
          </motion.h1>
          {unreadCount > 0 && (
            <motion.button
              variants={fadeUp}
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 transition-all"
              aria-label="Mark all as read"
            >
              <CheckCheck size={18} />
              <span>Mark all as read</span>
            </motion.button>
          )}
        </div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          className="flex gap-2 mb-6"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gradient-to-r from-ember to-amber text-white'
                : 'bg-slate-800/50 text-textSecondary hover:bg-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-gradient-to-r from-ember to-amber text-white'
                : 'bg-slate-800/50 text-textSecondary hover:bg-slate-800'
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </motion.div>
      </motion.div>

      {/* Notifications list */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-textSecondary">Loading notifications...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <CheckCheck size={48} className="text-slate-500 mx-auto" />
          </div>
          <p className="text-textSecondary text-lg mb-2">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
          <p className="text-slate-500 text-sm">
            You'll see notifications here when someone interacts with your content
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.05, 0.03)}
          className="space-y-3"
        >
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={fadeUp}
              onClick={() => handleNotificationClick(notification)}
              className={`rounded-xl bg-card/70 backdrop-blur-lg border p-4 cursor-pointer transition-all hover:border-amber/40 hover:bg-card/90 ${
                notification.is_read
                  ? 'border-slate-800/60'
                  : 'border-amber/40 bg-amber/5'
              }`}
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 overflow-hidden">
                    {notification.sender?.avatar_url ? (
                      <Image
                        src={notification.sender.avatar_url}
                        alt={notification.sender.full_name || 'User'}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-white">
                        {notification.sender?.full_name?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    {getNotificationIcon(notification.type)}
                    <p className="text-sm text-white flex-1">
                      {getNotificationMessage(notification)}
                    </p>
                    {!notification.is_read && (
                      <div className="w-2 h-2 rounded-full bg-amber flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-textSecondary">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

