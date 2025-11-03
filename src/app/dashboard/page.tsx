'use client';

import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardShell from '@/components/dashboard/DashboardShell';
import AnalyticsModule from '@/components/dashboard/AnalyticsModule';
import Logo from '@/components/ui/Logo';

export default function DashboardPage() {
  const { user, profile, loading, isAuthenticated } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <Logo variant="hero" className="mx-auto mb-6" />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-xl"
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  // Auth guards
  if (!isAuthenticated) {
    redirect('/auth?redirect=/dashboard');
  }

  if (profile?.role !== 'creator') {
    redirect('/feed');
  }

  // Get user name for welcome message
  const userName = profile?.name || profile?.full_name || user?.email?.split('@')[0] || 'Creator';

  return (
    <DashboardShell>
      <AnalyticsModule userId={user.id} userName={userName} />
    </DashboardShell>
  );
}
