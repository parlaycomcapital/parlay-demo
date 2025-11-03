'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { CheckCircle, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, loading, isAuthenticated, refreshProfile, updateProfile } = useSupabaseAuth();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth');
      } else {
        // Check if role needs to be set from URL params or metadata
        const handleRoleSetup = async () => {
          if (user && !profile) {
            // Profile doesn't exist yet, might be from email confirmation
            // Check user metadata for role
            const userMetadata = user.profile || null;
            if (!userMetadata) {
              // Try to get from session
              const { data: { session } } = await supabase.auth.getSession();
              const roleFromMeta = session?.user?.user_metadata?.role;
              if (roleFromMeta) {
                // Create or update profile with role
                await updateProfile({ role: roleFromMeta });
              }
            }
          }
          setLocalLoading(false);
        };
        handleRoleSetup();
        refreshProfile();
      }
    }
  }, [loading, isAuthenticated, router, refreshProfile, user, profile]);

  if (loading || localLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Logo variant="hero" className="mx-auto mb-6" />
          <p className="text-slate-400 text-lg">Authenticating your account…</p>
        </motion.div>
      </div>
    );
  }

  const isCreator = profile?.role === 'creator';
  const isFollower = profile?.role === 'follower';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl bg-card/70 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-slate-800/60 shadow-[0_0_40px_rgba(245,166,35,0.1)] z-10 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-amber" />
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-poppins font-semibold text-white mb-3"
        >
          You're in!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg mb-8"
        >
          Welcome to Parlay, {profile?.full_name || user?.email?.split('@')[0]}! Your{' '}
          <span className="text-amber font-medium">{profile?.role || 'follower'}</span> account is
          all set.
        </motion.p>

        {/* Role-specific Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {isCreator ? (
            <>
              <div className="p-4 rounded-xl bg-gradient-to-br from-ember/10 to-transparent border border-slate-800/50">
                <TrendingUp className="w-8 h-8 text-ember mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Share Insights</h3>
                <p className="text-sm text-slate-400">
                  Post premium analysis and grow your following
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber/10 to-transparent border border-slate-800/50">
                <Users className="w-8 h-8 text-amber mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Build Community</h3>
                <p className="text-sm text-slate-400">
                  Create groups and engage with your audience
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-xl bg-gradient-to-br from-ember/10 to-transparent border border-slate-800/50">
                <Sparkles className="w-8 h-8 text-ember mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Discover Insights</h3>
                <p className="text-sm text-slate-400">
                  Follow verified creators and access premium content
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber/10 to-transparent border border-slate-800/50">
                <TrendingUp className="w-8 h-8 text-amber mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Track ROI</h3>
                <p className="text-sm text-slate-400">
                  See real performance metrics from analysts you trust
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/feed"
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all"
            >
              Continue to Feed
            </Link>
          </motion.div>
          {isCreator && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/create"
                className="inline-block px-8 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 transition-all"
              >
                Create First Post
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}

