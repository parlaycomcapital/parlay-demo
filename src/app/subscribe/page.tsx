'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Sparkles, Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { subscriptionTiers } from '@/lib/stripe';

export default function SubscribePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: 'basic' | 'pro', provider: 'stripe' | 'gopay' = 'stripe') => {
    if (!session?.user) {
      router.push('/login?redirect=/subscribe');
      return;
    }

    setLoading(tier);

    try {
      const endpoint = provider === 'gopay' ? '/api/gopay/checkout' : '/api/stripe/checkout';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, userId: session.user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Subscribe error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-navy-100 py-12 px-5 lg:px-6">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <Logo size={64} className="mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-slatex-400 max-w-xl mx-auto">
            Unlock premium content, join exclusive communities, and support your favorite creators.
          </p>
          {process.env.PLACEHOLDER_MODE === 'true' && (
            <p className="mt-2 text-xs text-amber/60">
              Demo Mode: Subscriptions are simulated
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {(['basic', 'pro'] as const).map((tier, index) => {
            const config = subscriptionTiers[tier];
            const isPro = tier === 'pro';

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`card p-6 lg:p-8 relative ${isPro ? 'border-amber/50 shadow-ember' : ''}`}
              >
                {isPro && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-amber/20 text-amber text-xs font-semibold">
                    <Sparkles size={12} />
                    Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{config.name}</h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">${config.price}</span>
                    <span className="text-slatex-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {config.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-amber mt-0.5 flex-shrink-0" />
                      <span className="text-slatex-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <motion.button
                    onClick={() => handleSubscribe(tier, 'stripe')}
                    disabled={!!loading}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      isPro
                        ? 'btn-grad'
                        : 'bg-white/5 border border-slate-700 text-white hover:bg-white/10'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === tier ? 'Processing...' : `Subscribe to ${config.name}`}
                  </motion.button>
                  <motion.button
                    onClick={() => handleSubscribe(tier, 'gopay')}
                    disabled={!!loading}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                    className="w-full py-2 rounded-xl text-sm font-medium bg-slate-700/50 border border-slate-600 text-white hover:bg-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Globe size={16} />
                    Pay with GoPay (CZ/SK)
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-slatex-400 text-sm">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
