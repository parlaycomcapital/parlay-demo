'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import Link from 'next/link';
import { TrendingUp, Shield, Users, Zap } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background with ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ backgroundPosition: 'center top' }}
          animate={{ backgroundPosition: 'center bottom' }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-10 bg-cover"
        />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(230,62,48,0.2) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Hero Content */}
      <section className="relative container-narrow text-center pt-24 pb-20">
        <ScrollReveal>
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 24px rgba(230,62,48,0.35))',
                'drop-shadow(0 0 32px rgba(230,62,48,0.45))',
                'drop-shadow(0 0 24px rgba(230,62,48,0.35))',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Logo 
              size={84} 
              variant="transparent" 
              className="mx-auto mb-6" 
            />
          </motion.div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-white">
            Analytics Meets <span className="gradient-text">Adrenaline</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-slatex-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The first social platform for sports analysis. Follow trusted analysts, track transparent ROI, 
            and join communities of data-driven minds.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/feed" 
                className="btn-grad px-8 py-3 text-base"
              >
                Explore the Platform
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition-all duration-fast font-medium"
              >
                Get Started Free
              </Link>
            </motion.div>
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
            <div className="card p-6 text-center group">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <TrendingUp size={32} className="text-ember" />
              </motion.div>
              <h3 className="text-lg font-heading font-semibold mb-2">Transparent Tracking</h3>
              <p className="text-slatex-400 text-sm">
                Real ROI, win rates, and performance metrics for every analyst. Trust the numbers.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="card p-6 text-center group">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Shield size={32} className="text-amber" />
              </motion.div>
              <h3 className="text-lg font-heading font-semibold mb-2">Verified Experts</h3>
              <p className="text-slatex-400 text-sm">
                Only verified analysts can post premium content. Quality over quantity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="card p-6 text-center group">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Users size={32} className="text-info" />
              </motion.div>
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
          {[
            { label: 'Verified Analysts', value: '50+', color: 'text-white' },
            { label: 'Active Users', value: '2,000+', color: 'text-white' },
            { label: 'Daily Insights', value: '100+', color: 'text-white' },
            { label: 'Avg. ROI', value: '12.5%', color: 'text-amber' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.05}>
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slatex-400">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container-narrow py-20 border-t border-slate-800">
        <ScrollReveal>
          <motion.div 
            className="card p-12 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Level Up Your Game?
            </h2>
            <p className="text-slatex-400 mb-8 max-w-xl mx-auto">
              Join Parlay Alpha free today. No credit card required. Experience the future of sports analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="btn-grad px-8 py-3">
                  Start Free Today
                </Link>
              </motion.div>
              <Link href="/feed" className="text-slatex-400 hover:text-amber transition">
                Explore First →
              </Link>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}