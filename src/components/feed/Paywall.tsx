'use client';

import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface PaywallProps {
  message?: string;
  isSubscriptionRequired?: boolean;
}

export default function Paywall({ 
  message = 'This content requires a Pro subscription',
  isSubscriptionRequired = true,
}: PaywallProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative backdrop-blur-lg bg-card/30 border border-amber/30 rounded-2xl p-8 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 28, 59, 0.4) 0%, rgba(230, 62, 48, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber/20 mb-4"
        >
          <Lock size={32} className="text-amber" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Premium Content</h3>
        <p className="text-slatex-300 mb-6">{message}</p>
        {isSubscriptionRequired && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 btn-grad px-6 py-3"
            >
              <Sparkles size={18} />
              Upgrade to Pro
            </Link>
          </motion.div>
        )}
      </div>
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 166, 35, 0.15) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
