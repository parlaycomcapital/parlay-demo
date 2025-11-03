'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { copy } from '@/content/landing';

function AnimatedCounter({ value, suffix = '', decimals = 1 }: { value: number; suffix?: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateValue);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function AnalyticsShowcase() {
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
          className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-8 md:p-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-amber text-sm font-medium uppercase tracking-wider mb-2 text-center"
          >
            {copy.sections.analytics.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.8rem,3vw,2.5rem)] font-poppins font-semibold text-white mb-4 text-center"
          >
            {copy.sections.analytics.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-textSecondary text-center mb-8 max-w-2xl mx-auto"
          >
            {copy.sections.analytics.body}
          </motion.p>
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-textSecondary"
          >
            {copy.sections.analytics.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                {bullet}
              </li>
            ))}
          </motion.ul>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div variants={fadeUp} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent mb-2">
                ROI +<AnimatedCounter value={42.6} suffix="%" decimals={1} />
              </div>
              <p className="text-textSecondary">Average ROI</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={61} suffix="%" decimals={0} />
              </div>
              <p className="text-textSecondary">Win Rate</p>
            </motion.div>
          </div>

          {/* Faux sparkline */}
          <motion.div
            variants={fadeUp}
            className="h-32 flex items-end justify-center gap-1"
          >
            {[...Array(20)].map((_, i) => {
              const height = Math.sin((i / 20) * Math.PI * 2) * 30 + 40 + Math.random() * 20;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${height}%` } : { height: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex-1 bg-gradient-to-t from-ember to-amber rounded-t"
                  style={{ maxHeight: '80px' }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

