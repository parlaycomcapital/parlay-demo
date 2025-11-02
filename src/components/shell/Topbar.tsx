'use client';

import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

export default function Topbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-navy-100/80 backdrop-blur-md">
      <div className="h-14 flex items-center justify-between px-5 lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Logo size={28} />
          </Link>
          <div className="hidden sm:block text-slatex-400 text-sm">Smart Sports. Smarter Minds.</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slatex-400">
          <Link href="/feed" className="hover:text-amber transition">
            Feed
          </Link>
          {status === 'loading' ? (
            <div className="text-slatex-400">Loading...</div>
          ) : session ? (
            <>
              {session.user?.role === 'creator' && (
                <Link href="/dashboard" className="hover:text-amber transition">
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="hover:text-amber transition">
                Profile
              </Link>
              <motion.button
                onClick={() => signOut({ callbackUrl: '/' })}
                whileTap={{ scale: 0.95 }}
                className="text-slatex-400 hover:text-amber transition"
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-amber transition">
                Sign in
              </Link>
              <Link href="/register" className="btn-grad h-9 px-3">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}