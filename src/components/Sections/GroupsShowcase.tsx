'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { fadeUp, stagger, slideIn } from '@/lib/motion';

export default function GroupsShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Orbit nodes */}
        <div className="relative h-64 mb-16">
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { 
                  opacity: 0.3,
                  scale: 1,
                  x: x,
                  y: y,
                } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 2,
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber"
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1, 0.06)}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2rem,4vw,3rem)] font-poppins font-semibold text-white mb-4"
          >
            Join Analyst Communities
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-lg max-w-2xl mx-auto mb-8"
          >
            Connect with verified creators, join private groups, and access exclusive insights.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/groups"
              className="inline-block px-8 py-4 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all"
              aria-label="Explore groups"
            >
              Explore Groups
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

