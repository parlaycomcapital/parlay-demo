'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import GradientMotion from '@/components/ui/GradientMotion';
import ParticleField from '@/components/ui/ParticleField';
import { fadeUp, stagger, slideIn } from '@/lib/motion';

export default function Hero() {
  const scrollToFeed = () => {
    const feedSection = document.getElementById('feed');
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden px-6">
      {/* Ambient layers */}
      <GradientMotion />
      <ParticleField />

      {/* Hero content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1, 0.06)}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          className="mb-8"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.08))',
          }}
        >
          <Logo variant="hero" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-poppins font-semibold text-white leading-tight tracking-tight mb-6"
        >
          Smart Sports.{' '}
          <span className="bg-gradient-to-r from-ember to-amber bg-clip-text text-transparent">
            Smarter Minds.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-[clamp(1rem,1.5vw,1.25rem)] text-textSecondary font-inter leading-relaxed max-w-2xl mx-auto mb-10"
        >
          The social network where verified analysts share insights, track ROI, and build communities around data-driven sports intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/auth"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium text-lg hover:shadow-[0_0_28px_rgba(245,166,35,0.4)] transition-all"
              aria-label="Create account"
            >
              Create Account
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="#feed"
              className="inline-block px-8 py-4 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all text-lg"
              aria-label="Explore feed"
            >
              Explore Feed
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          onClick={scrollToFeed}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToFeed();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to feed section"
          aria-hidden="true"
        >
          <ChevronDown className="w-6 h-6 text-amber opacity-70" />
        </motion.div>
      </motion.div>

      {/* Gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(11,19,43,0) 0%, rgba(11,19,43,1) 100%)',
        }}
      />
    </section>
  );
}

