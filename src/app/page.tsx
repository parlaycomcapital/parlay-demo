'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GradientField from '@/components/ui/GradientField';
import { useAmbientLight } from '@/hooks/useAmbientLight';
import Link from 'next/link';
import { TrendingUp, Shield, Users, Zap, ArrowDown } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { x, y } = useAmbientLight();

  return (
    <div className="relative min-h-screen overflow-hidden perspective-container">
      {/* Gradient particle field */}
      <GradientField particleCount={35} intensity={0.12} />
      
      {/* Ambient animated gradient background */}
      <AnimatedGradient variant="ambient" className="opacity-15" />
      
      {/* Cursor-reactive ambient lighting */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle 800px at ${x} ${y}, rgba(245,166,35,0.08), transparent)`,
          transition: 'background 0.1s ease-out',
        }}
      />
      
      {/* Hero Content */}
      <section className="relative container-narrow text-center pt-24 pb-20 z-10">
        <ScrollReveal>
          {/* Logo with enhanced glow */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              filter: [
                'drop-shadow(0 0 24px rgba(230,62,48,0.35))',
                'drop-shadow(0 0 32px rgba(230,62,48,0.45))',
                'drop-shadow(0 0 24px rgba(230,62,48,0.35))',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
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
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="/feed" 
                className="btn-grad px-8 py-3 text-base inline-block"
              >
                Explore the Platform
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition-all duration-fast font-medium inline-block"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Alpha Badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-medium"
            animate={{
              boxShadow: [
                '0 0 10px rgba(245,166,35,0.2)',
                '0 0 20px rgba(245,166,35,0.3)',
                '0 0 10px rgba(245,166,35,0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={14} />
            Free Alpha — No Credit Card Required
          </motion.span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2 text-slatex-400 text-xs"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>Scroll for insights</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* Value Propositions */}
      <section className="relative container-narrow py-20 border-t border-slate-800 z-10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Why Choose <span className="gradient-text">Parlay</span>?
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <motion.div
              className="card p-6 text-center"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(230,62,48,0.2)',
                    '0 0 30px rgba(230,62,48,0.3)',
                    '0 0 20px rgba(230,62,48,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp size={32} className="text-ember" />
              </motion.div>
              <h3 className="text-lg font-heading font-semibold mb-2">Transparent Tracking</h3>
              <p className="text-slatex-400 text-sm">
                Real ROI, win rates, and performance metrics for every analyst. Trust the numbers.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              className="card p-6 text-center"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(245,166,35,0.2)',
                    '0 0 30px rgba(245,166,35,0.3)',
                    '0 0 20px rgba(245,166,35,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <Shield size={32} className="text-amber" />
              </motion.div>
              <h3 className="text-lg font-heading font-semibold mb-2">Verified Experts</h3>
              <p className="text-slatex-400 text-sm">
                Only verified analysts can post premium content. Quality over quantity.
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div
              className="card p-6 text-center"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59,130,246,0.2)',
                    '0 0 30px rgba(59,130,246,0.3)',
                    '0 0 20px rgba(59,130,246,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <Users size={32} className="text-info" />
              </motion.div>
              <h3 className="text-lg font-heading font-semibold mb-2">Thriving Communities</h3>
              <p className="text-slatex-400 text-sm">
                Join sport-specific groups, share insights, and learn from the best minds.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative container-narrow py-20 border-t border-slate-800 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-slatex-400">Verified Analysts</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-white mb-2">2,000+</div>
            <div className="text-sm text-slatex-400">Active Users</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-slatex-400">Daily Insights</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-amber mb-2">12.5%</div>
            <div className="text-sm text-slatex-400">Avg. ROI</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container-narrow py-20 border-t border-slate-800 z-10">
        <ScrollReveal>
          <motion.div
            className="card p-12 text-center"
            whileHover={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 30px rgba(230, 62, 48, 0.15)',
              transition: { duration: 0.3 },
            }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Level Up Your Game?
            </h2>
            <p className="text-slatex-400 mb-8 max-w-xl mx-auto">
              Join Parlay Alpha free today. No credit card required. Experience the future of sports analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="btn-grad px-8 py-3 inline-block">
                  Start Free Today
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/feed" className="text-slatex-400 hover:text-amber transition">
                  Explore First →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}