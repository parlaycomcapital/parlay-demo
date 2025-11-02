'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative">
      <motion.div
        initial={{ backgroundPosition: 'center top' }}
        animate={{ backgroundPosition: 'center bottom' }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 opacity-10 bg-cover"
      />
      <section className="relative container-narrow text-center pt-24 pb-20">
        <ScrollReveal>
          <Logo size={84} variant="transparent" className="mx-auto mb-6 drop-shadow-[0_0_24px_rgba(230,62,48,0.35)]" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Analytics Meets Adrenaline</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-slatex-400 max-w-xl mx-auto mb-8">
            A social platform for sports insights, built for fans and analysts. Buy premium picks,
            follow trusted voices, and track performance transparently.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center gap-3">
            <Link href="/feed" className="btn-grad">
              Browse Feed
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition"
            >
              Sign in
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}