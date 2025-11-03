'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import NotificationBell from './NotificationBell';

export default function Topbar() {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous && latest > 100) {
      // Scrolling down - hide navbar
      setIsVisible(false);
    } else if (latest < previous) {
      // Scrolling up - show navbar
      setIsVisible(true);
    }
  });

  return (
    <motion.header
      className="sticky top-0 z-40 w-full h-18 border-b border-slate-800 bg-navy/80 backdrop-blur-md"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="h-full flex items-center justify-between px-5 lg:px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo variant="navbar" />
          </Link>
          <AnimatePresence mode="wait">
            {scrollY.get() < 50 && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:block text-textSecondary text-sm overflow-hidden"
              >
                Smart Sports. Smarter Minds.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-textSecondary">
          <Link href="/feed" className="hover:text-amber transition-colors focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded">
            Feed
          </Link>
          {status === 'loading' ? (
            <div className="text-slatex-400">Loading...</div>
          ) : session ? (
            <>
              {session.user?.role === 'creator' && (
                <Link href="/dashboard" className="hover:text-amber transition-colors focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded">
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="hover:text-amber transition-colors focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded">
                Profile
              </Link>
              <NotificationBell />
              <motion.button
                onClick={() => signOut({ callbackUrl: '/' })}
                whileTap={{ scale: 0.95 }}
                className="text-slatex-400 hover:text-amber transition-colors focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded"
                aria-label="Sign out"
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-amber transition-colors focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded">
                Sign in
              </Link>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(224, 161, 76, 0.3)' }}
                whileTap={{ scale: 0.95, boxShadow: 'none' }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/register" className="btn-grad h-9 px-3 focus-visible:ring-amber/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded">
                  Sign up
                </Link>
              </motion.div>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}