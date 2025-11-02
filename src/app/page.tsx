'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import Link from 'next/link';
import { TrendingUp, Shield, Users, Zap } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
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
            The first social platform for sports analysis. Follow trusted analysts, track transparent ROI, 
            and join communities of data-driven minds.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link 
              href="/feed" 
              className="btn-grad px-8 py-3 text-base"
            >
              Explore the Platform
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition-all duration-fast font-medium"
            >
              Get Started Free
            </Link>
          </div>
        </ScrollReveal>

        {/* Alpha Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-medium">
            <Zap size={14} />
            Free Alpha — No Credit Card Required
          </span>
        </motion.div>
      </section>

      {/* Value Propositions */}
      <section className="relative container-narrow py-20 border-t border-slate-800">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Why Choose <span className="gradient-text">Parlay</span>?
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-ember" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Transparent Tracking</h3>
              <p className="text-slatex-400 text-sm">
                Real ROI, win rates, and performance metrics for every analyst. Trust the numbers.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-amber" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Verified Experts</h3>
              <p className="text-slatex-400 text-sm">
                Only verified analysts can post premium content. Quality over quantity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-info" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Thriving Communities</h3>
              <p className="text-slatex-400 text-sm">
                Join sport-specific groups, share insights, and learn from the best minds.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative container-narrow py-20 border-t border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-slatex-400">Verified Analysts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">2,000+</div>
            <div className="text-sm text-slatex-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-slatex-400">Daily Insights</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber mb-2">12.5%</div>
            <div className="text-sm text-slatex-400">Avg. ROI</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container-narrow py-20 border-t border-slate-800">
        <ScrollReveal>
          <div className="card p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Level Up Your Game?
            </h2>
            <p className="text-slatex-400 mb-8 max-w-xl mx-auto">
              Join Parlay Alpha free today. No credit card required. Experience the future of sports analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link href="/register" className="btn-grad px-8 py-3">
                Start Free Today
              </Link>
              <Link href="/feed" className="text-slatex-400 hover:text-amber transition">
                Explore First →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}