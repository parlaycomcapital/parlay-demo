'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export default function NotificationBell() {
  const { user } = useSupabaseAuth();
  const { unreadCount } = useNotifications();

  if (!user) {
    return null;
  }

  return (
    <Link href="/notifications" className="relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg text-slate-300 hover:text-amber transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell size={20} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-ember to-amber text-white text-xs font-bold flex items-center justify-center shadow-ember"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

