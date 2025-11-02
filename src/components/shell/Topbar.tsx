'use client';

import Logo from '@/components/ui/Logo';
import Link from 'next/link';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-navy-100/80 backdrop-blur-md">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <div className="hidden sm:block text-slatex-400 text-sm">Smart Sports. Smarter Minds.</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slatex-400">
          <Link href="/feed" className="hover:text-amber transition">
            Feed
          </Link>
          <Link href="/explore" className="hover:text-amber transition">
            Explore
          </Link>
          <Link href="/dashboard" className="hover:text-amber transition">
            Dashboard
          </Link>
          <Link href="/login" className="btn-grad h-9 px-3">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}