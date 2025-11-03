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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={unreadCount > 0 ? {
          rotate: [0, -5, 5, -5, 0],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: unreadCount > 0 ? Infinity : 0,
          repeatDelay: 2,
        }}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                '0 0 8px rgba(245, 166, 35, 0.5)',
                '0 0 16px rgba(245, 166, 35, 0.7)',
                '0 0 8px rgba(245, 166, 35, 0.5)',
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber text-navy-100 text-xs font-bold flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl z-50"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-heading font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <motion.button
                    onClick={markAllAsRead}
                    className="text-xs text-amber hover:text-amber-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark all read
                  </motion.button>
                )}
              </div>

              {/* Notifications List */}
              <div className="p-2">
                {loading ? (
                  <div className="text-center text-slatex-400 py-8 text-sm">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="text-center text-slatex-400 py-8 text-sm">
                    <Bell size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={getNotificationLink(notification)}
                          onClick={() => setOpen(false)}
                          className={`block p-3 rounded-lg transition-colors hover:bg-slate-800/50 ${
                            !notification.read ? 'bg-amber/5 border-l-2 border-amber' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slatex-300 line-clamp-2">
                                {getNotificationMessage(notification)}
                              </p>
                              <p className="text-xs text-slatex-500 mt-1">
                                {new Date(notification.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}