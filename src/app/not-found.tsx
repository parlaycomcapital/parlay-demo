'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center">
        {/* Parlay Logo */}
        <div className="mb-8">
          <Logo variant="hero" className="mx-auto" />
        </div>

        <h1 className="text-6xl font-heading font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-white/70 mb-8 font-body max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-ember text-white px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-ember/25"
          >
            Go Home
          </Link>
          <Link
            href="/feed"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-semibold hover:bg-white hover:text-navy transition-colors"
          >
            Browse Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
