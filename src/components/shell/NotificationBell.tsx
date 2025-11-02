'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { isPlaceholderMode } from '@/lib/mockData';

export default function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  
  // In placeholder mode, show mock notifications
  const mockNotifications = isPlaceholderMode() ? [
    { id: '1', type: 'like', message: 'Demo Creator liked your post', read: false },
    { id: '2', type: 'comment', message: 'New comment on your analysis', read: false },
    { id: '3', type: 'follow', message: 'Sports Analyst started following you', read: true },
  ] : [];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

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
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="overflow-y-auto max-h-80 custom-scrollbar">
                {mockNotifications.length === 0 ? (
                  <div className="p-8 text-center text-slatex-400 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {mockNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className={`p-4 cursor-pointer transition ${!notification.read ? 'bg-white/5' : ''}`}
                      >
                        <p className="text-sm text-slatex-300">{notification.message}</p>
                        <p className="text-xs text-slatex-500 mt-1">Just now</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              {mockNotifications.length > 0 && (
                <div className="p-3 border-t border-slate-800 text-center">
                  <button className="text-xs text-amber hover:underline">
                    Mark all as read
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
