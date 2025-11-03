'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Sparkles, Zap } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { subscriptionTiers } from '@/lib/stripeClient';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useSupabaseSubscription } from '@/hooks/useSupabaseSubscription';

export default function SubscribePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useSupabaseAuth();
  const { subscription, hasProSubscription, loading: subLoading } = useSupabaseSubscription();
  const [loading, setLoading] = useState<string | null>(null);

  // Redirect to auth if not authenticated
  if (!isAuthenticated && !subLoading) {
    router.push('/auth?redirect=/subscribe');
    return null;
  }

  const handleSubscribe = async (tier: 'pro') => {
    if (!user) {
      router.push('/auth?redirect=/subscribe');
      return;
    }

    setLoading(tier);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          tier,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url && typeof window !== 'undefined') {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Subscribe error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
      setLoading(null);
    }
  };

  const isPro = hasProSubscription();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Logo variant="hero" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-semibold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Unlock premium content, join exclusive communities, and support your favorite creators.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-800/60 bg-card/70 backdrop-blur-lg p-8 text-center relative"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{subscriptionTiers.free.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{subscriptionTiers.free.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-bold bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent">
                {subscriptionTiers.free.priceDisplay}
              </span>
              <span className="text-slate-400 ml-2">/month</span>
            </div>

            <ul className="space-y-3 mb-8 text-left">
              {subscriptionTiers.free.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-amber mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full px-6 py-3 rounded-xl bg-slate-800/50 text-slate-400 font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl border ${
              subscription?.tier === 'pro' && subscription?.status === 'active'
                ? 'border-amber/60 shadow-[0_0_40px_rgba(245,166,35,0.2)]'
                : 'border-amber/40 shadow-[0_0_40px_rgba(245,166,35,0.1)]'
            } bg-card/80 backdrop-blur-lg p-8 text-center relative overflow-hidden`}
          >
            {/* Popular Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-amber/20 text-amber text-xs font-semibold">
              <Sparkles size={14} />
              Popular
            </div>

            {/* Highlight Effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(245,166,35,0.1), transparent 50%)`,
              }}
            />

            <div className="relative">
              <h2 className="text-2xl font-semibold text-white mb-2">{subscriptionTiers.pro.name}</h2>
              <p className="text-slate-400 text-sm mb-6">{subscriptionTiers.pro.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent">
                  {subscriptionTiers.pro.priceDisplay}
                </span>
                <span className="text-slate-400 ml-2">/month</span>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                {subscriptionTiers.pro.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-amber mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {isPro ? (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium shadow-[0_0_20px_rgba(245,166,35,0.3)] opacity-75 cursor-not-allowed"
                  >
                    <Check size={18} className="inline mr-2" />
                    Active
                  </button>
                  <p className="text-xs text-slate-400">
                    Your Pro subscription is active
                  </p>
                </div>
              ) : (
                <motion.button
                  onClick={() => handleSubscribe('pro')}
                  disabled={!!loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium shadow-[0_0_20px_rgba(245,166,35,0.3)] hover:shadow-[0_0_28px_rgba(245,166,35,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === 'pro' ? (
                    <>
                      <Zap size={18} className="inline mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={18} className="inline mr-2" />
                      Go Pro
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            All plans include a 7-day free trial. Cancel anytime.
            <br />
            Secure payment powered by Stripe.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
