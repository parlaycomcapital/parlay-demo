'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      router.push('/subscribe');
      return;
    }

    // Verify subscription was created
    setTimeout(() => {
      setLoading(false);
      // Redirect to feed after 3 seconds
      setTimeout(() => {
        router.push('/feed');
      }, 3000);
    }, 2000);
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-amber animate-spin mx-auto mb-4" />
          <p className="text-slatex-400">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-100 flex items-center justify-center p-5 lg:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card p-8 lg:p-12 max-w-md w-full text-center"
      >
        <Logo size={64} className="mx-auto mb-6" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Parlay Pro!</h1>
        <p className="text-slatex-400 mb-6">
          Your subscription is active. You now have access to all premium content and features.
        </p>
        <motion.button
          onClick={() => router.push('/feed')}
          whileTap={{ scale: 0.98 }}
          className="btn-grad w-full"
        >
          Start Exploring
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function SubscribeSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-amber animate-spin mx-auto mb-4" />
          <p className="text-slatex-400">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
