'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/motion';
import { Check, Zap } from 'lucide-react';
import { copy } from '@/content/landing';

export default function SubscriptionsShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1, 0.06)}
        >
          <motion.p
            variants={fadeUp}
            className="text-amber text-sm font-medium uppercase tracking-wider mb-2 text-center"
          >
            {copy.sections.subscriptions.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2rem,4vw,3rem)] font-poppins font-semibold text-white mb-4 text-center"
          >
            {copy.sections.subscriptions.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-lg text-center mb-6 max-w-2xl mx-auto"
          >
            {copy.sections.subscriptions.body}
          </motion.p>
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mb-12 text-sm text-textSecondary"
          >
            {copy.sections.subscriptions.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                {bullet}
              </li>
            ))}
          </motion.ul>

          {/* Pricing card */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-card/70 backdrop-blur-lg border border-amber/40 p-8 md:p-12 hover:shadow-[0_0_40px_rgba(245,166,35,0.2)] transition-all"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/20 text-amber text-sm font-semibold mb-4">
                <Zap size={16} />
                Popular
              </div>
              <h3 className="text-3xl font-poppins font-semibold text-white mb-2">Pro</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent mb-2">
                $14.99
              </div>
              <p className="text-textSecondary">/month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlock all premium posts',
                'Exclusive creator insights',
                'Advanced ROI tracking',
                'Priority support',
                'Join private groups',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={20} className="text-amber flex-shrink-0" />
                  <span className="text-textPrimary">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/subscribe"
                className="block w-full text-center px-8 py-4 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_28px_rgba(245,166,35,0.4)] transition-all"
                aria-label="Go Pro - Test Mode"
              >
                Go Pro — Test Mode
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

