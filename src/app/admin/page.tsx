'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login');
    }
  }, [session, isLoading, router]);

  if (isLoading) return <p className="text-slate-300 text-center mt-10">Loading...</p>;

  if (!session?.user) {
    return null;
  }

  // Admin functionality can be added later
  // For now, redirect creators to dashboard and followers to feed
  if (session.user.role === 'creator') {
    router.push('/dashboard');
    return null;
  }

  router.push('/feed');
  return null;
}