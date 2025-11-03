'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

interface WithRoleProps {
  children: ReactNode;
  allowedRoles: string[];
}

export function withRole(Component: React.ComponentType<any>, allowedRoles: string[]) {
  return function ProtectedComponent(props: any) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
      return (
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <div className="text-center">
            <Logo variant="hero" className="mb-6 animate-pulse" />
            <p className="text-white text-xl">Loading...</p>
          </div>
        </div>
      );
    }

    if (!session?.user) {
      return (
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <div className="text-center">
            <Logo variant="hero" className="mb-6" />
            <p className="text-white text-xl mb-4">Please sign in</p>
            <Link
              href="/login"
              className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Login
            </Link>
          </div>
        </div>
      );
    }

    if (!session.user.role || !allowedRoles.includes(session.user.role)) {
      return (
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <div className="text-center">
            <Logo variant="hero" className="mb-6" />
            <p className="text-white text-xl mb-4">Access denied</p>
            <p className="text-slate-300 mb-6">
              You need {allowedRoles.join(' or ')} role to access this page.
            </p>
            <Link
              href="/feed"
              className="bg-gradient-ember text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Feed
            </Link>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
