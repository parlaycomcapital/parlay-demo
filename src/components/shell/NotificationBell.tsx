'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Heart, MessageCircle, UserPlus, Sparkles, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useNotifications } from '@/hooks/useNotifications';
import Link from 'next/link';

export default function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={16} className="text-red-400" />;
      case 'comment':
        return <MessageCircle size={16} className="text-blue-400" />;
      case 'follow':
        return <UserPlus size={16} className="text-green-400" />;
      case 'subscription':
        return <Sparkles size={16} className="text-amber" />;
      case 'group_invite':
        return <Users size={16} className="text-purple-400" />;
      default:
        return <Bell size={16} />;
    }
  };

  const getNotificationMessage = (notification: any) => {
    const actorName = notification.actor?.name || notification.actor?.email || 'Someone';
    switch (notification.type) {
      case 'like':
        return `${actorName} liked your post`;
      case 'comment':
        return `${actorName} commented on your post`;
      case 'follow':
        return `${actorName} started following you`;
      case 'subscription':
        return `${actorName} subscribed to your content`;
      case 'group_invite':
        return `You've been invited to join a group`;
      default:
        return 'New notification';
    }
  };

  const getNotificationLink = (notification: any) => {
    if (notification.post_id) return `/post/${notification.post_id}`;
    if (notification.group_id) return `/groups/${notification.group_id}`;
    if (notification.type === 'follow') return `/profile/${notification.actor_id}`;
    return '/feed';
  };

  if (!session?.user) return null;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="icon-btn relative"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber text-navy-100 text-xs font-bold flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 bg-navy-300 border border-slate-800 rounded-xl shadow-card z-50 max-h-96 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-amber hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="overflow-y-auto max-h-80 custom-scrollbar">
                {loading ? (
                  <div className="p-8 text-center text-slatex-400 text-sm">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-slatex-400 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={getNotificationLink(notification)}
                        onClick={() => {
                          if (!notification.read) {
                            markAsRead(notification.id);
                          }
                        }}
                      >
                        <motion.div
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          className={`p-4 cursor-pointer transition ${!notification.read ? 'bg-white/5' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slatex-300">
                                {getNotificationMessage(notification)}
                              </p>
                              <p className="text-xs text-slatex-500 mt-1">
                                {new Date(notification.created_at).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-amber mt-2 flex-shrink-0" />
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-3 border-t border-slate-800 text-center">
                  <Link
                    href="/notifications"
                    className="text-xs text-amber hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
