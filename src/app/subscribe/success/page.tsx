'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useSupabaseSubscription } from '@/hooks/useSupabaseSubscription';

function SubscribeSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { refreshSubscription } = useSupabaseSubscription();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refresh subscription status after successful payment
    if (sessionId) {
      // Wait a moment for webhook to process, then refresh
      setTimeout(() => {
        refreshSubscription();
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [sessionId, refreshSubscription]);

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
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-card/70 backdrop-blur-lg p-10 rounded-2xl border border-slate-800/60 shadow-[0_0_40px_rgba(245,166,35,0.1)] text-center z-10"
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

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-poppins font-semibold text-white mb-3"
        >
          Subscription Activated 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mb-8 leading-relaxed"
        >
          Your Pro subscription is now active! Enjoy full access to premium insights, exclusive creator content, and advanced analytics.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 space-y-3"
        >
          <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-slate-900/50">
            <Sparkles size={20} className="text-amber flex-shrink-0" />
            <span className="text-slate-300 text-sm">Unlock all premium posts</span>
          </div>
          <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-slate-900/50">
            <Sparkles size={20} className="text-amber flex-shrink-0" />
            <span className="text-slate-300 text-sm">Access exclusive creator insights</span>
          </div>
          <div className="flex items-center gap-3 text-left p-3 rounded-lg bg-slate-900/50">
            <Sparkles size={20} className="text-amber flex-shrink-0" />
            <span className="text-slate-300 text-sm">Join private analyst groups</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/feed"
              className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all"
            >
              Go to Feed
              <ArrowRight size={18} className="inline ml-2" />
            </Link>
          </motion.div>
          <Link
            href="/profile"
            className="block text-sm text-slate-400 hover:text-amber transition-colors"
          >
            Manage subscription
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function SubscribeSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E]">
        <div className="text-center">
          <Logo variant="hero" className="mx-auto mb-6 opacity-50" />
          <p className="text-slate-400 text-lg">Loading...</p>
        </div>
      </main>
    }>
      <SubscribeSuccessContent />
    </Suspense>
  );
}
