'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, stagger } from '@/lib/motion';

export default function FeedShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="feed"
      ref={ref}
      className="relative py-24 px-4 md:px-8"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1, 0.06)}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2rem,4vw,3rem)] font-poppins font-semibold text-white mb-4"
          >
            Real-time Insights
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-lg max-w-2xl mx-auto"
          >
            Realtime insights • Creator-led
          </motion.p>
        </motion.div>

        {/* Mock cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:shadow-[0_0_28px_rgba(245,166,35,0.15)] transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ember/30 to-amber/30" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-700/50 rounded w-32 mb-2" />
                  <div className="h-3 bg-slate-800/50 rounded w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-full" />
                <div className="h-4 bg-slate-700/50 rounded w-5/6" />
                <div className="h-4 bg-slate-700/50 rounded w-4/6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

