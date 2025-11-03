'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import NotificationBell from './NotificationBell';

export default function Topbar() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-40 w-full h-18 border-b border-slate-800 bg-navy/80 backdrop-blur-md"
      initial={false}
      animate={{
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full flex items-center justify-between px-5 lg:px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo variant="navbar" />
          </Link>
          <AnimatePresence mode="wait">
            {!scrolled && (
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
          <Link href="/feed" className="hover:text-amber transition-colors">
            Feed
          </Link>
          {status === 'loading' ? (
            <div className="text-slatex-400">Loading...</div>
          ) : session ? (
            <>
              {session.user?.role === 'creator' && (
                <Link href="/dashboard" className="hover:text-amber transition-colors">
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="hover:text-amber transition-colors">
                Profile
              </Link>
              <NotificationBell />
              <motion.button
                onClick={() => signOut({ callbackUrl: '/' })}
                whileTap={{ scale: 0.95 }}
                className="text-slatex-400 hover:text-amber transition-colors"
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-amber transition-colors">
                Sign in
              </Link>
              <Link href="/register" className="btn-grad h-9 px-3">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}