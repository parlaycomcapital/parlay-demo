'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      {/* Animated Background */}
      <motion.div
        initial={{ backgroundPosition: 'center top' }}
        animate={{ backgroundPosition: 'center bottom' }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-10 bg-cover pointer-events-none"
      />
      
      {/* Hero Content */}
      <section className="relative container-narrow text-center pt-24 pb-20">
        <ScrollReveal>
          <Logo 
            size={84} 
            variant="transparent" 
            className="mx-auto mb-6 drop-shadow-[0_0_24px_rgba(230,62,48,0.35)]" 
          />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 text-white">
            Analytics Meets <span className="gradient-text">Adrenaline</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-lg text-slatex-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A social platform for sports insights, built for fans and analysts. Buy premium picks,
            follow trusted voices, and track performance transparently.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link 
              href="/feed" 
              className="btn-grad px-8 py-3 text-base"
            >
              Browse Feed
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition-all duration-fast font-medium"
            >
              Sign in
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}