'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import ScrollReveal from '@/components/feed/ScrollReveal';
import GradientField from '@/components/ui/GradientField';
import { useAmbientLight } from '@/hooks/useAmbientLight';
import Link from 'next/link';
import { TrendingUp, Shield, Users, Zap, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import { fadeUp } from '@/lib/motion';

export default function HomePage() {
  const { x, y } = useAmbientLight();

  const scrollToFeed = () => {
    const feedSection = document.getElementById('feed-section');
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinematic background gradient */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, rgba(198,74,56,0.25), transparent 70%),
                       linear-gradient(180deg, #0B132B 0%, #101A2E 100%)`,
        }}
      />

      {/* Gradient particle field */}
      <GradientField particleCount={35} intensity={0.12} />

      {/* Cursor-reactive ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle 800px at ${x} ${y}, rgba(255,255,255,0.04), transparent)`,
          transition: 'background 0.1s ease-out',
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 md:px-10 overflow-hidden pt-[10vh] md:pt-[15vh] pb-[10vh] z-10">
        <ScrollReveal>
          {/* Logo with prominence and glow */}
          <motion.div
            layoutId="hero-logo"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-8"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.15))',
              willChange: 'transform',
            }}
          >
            <Logo variant="hero" className="mx-auto w-[clamp(84px,12vw,128px)] h-auto" />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold font-poppins text-white leading-tight">
            Smart Sports.
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text">Smarter Minds.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 max-w-xl mx-auto text-[clamp(1rem,1.4vw,1.25rem)] text-slate-300 font-inter leading-relaxed">
            Join the next evolution of sports insights and analytics.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(224, 161, 76, 0.3)' }}
                whileTap={{ scale: 0.97, boxShadow: 'none' }}
                transition={{ duration: 0.2 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium shadow-lg hover:opacity-90 transition w-full sm:w-auto"
                aria-label="Join Alpha Access"
              >
                <Link href="/register">Join Alpha Access</Link>
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-3 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 transition w-full sm:w-auto"
                aria-label="View Demo"
              >
                <Link href="/feed">View Demo</Link>
              </motion.button>
            </motion.div>
          </motion.div>
        </ScrollReveal>

        {/* Scroll-down indicator */}
        <motion.div
          className="mt-10 cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          onClick={scrollToFeed}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToFeed();
            }
          }}
          aria-label="Scroll to feed section"
        >
          <ChevronDown className="text-amber/80 w-6 h-6 opacity-80" />
        </motion.div>

        {/* Gradient fade transition to feed */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(11,19,43,0) 0%, rgba(11,19,43,1) 100%)',
          }}
        />
      </section>

      {/* Feed Section */}
      <section id="feed-section" className="relative container-narrow py-20 z-10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Latest <span className="gradient-text">Insights</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
              <h3 className="text-lg font-heading font-semibold mb-2 text-white">Transparent Tracking</h3>
              <p className="text-slate-400 text-sm">
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
              <h3 className="text-lg font-heading font-semibold mb-2 text-white">Verified Experts</h3>
              <p className="text-slate-400 text-sm">
                Only verified analysts can post premium content. Quality over quantity.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>

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
            <h3 className="text-lg font-heading font-semibold mb-2 text-white">Thriving Communities</h3>
            <p className="text-slate-400 text-sm">
              Join sport-specific groups, share insights, and learn from the best minds.
            </p>
          </motion.div>
        </ScrollReveal>
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
            <div className="text-sm text-slate-400">Verified Analysts</div>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-white mb-2">2,000+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-slate-400">Daily Insights</div>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-amber mb-2">12.5%</div>
            <div className="text-sm text-slate-400">Avg. ROI</div>
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
              Ready to Level Up Your Game?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join Parlay Alpha free today. No credit card required. Experience the future of sports analysis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="btn-grad px-8 py-3 inline-block" aria-label="Start Free Today">
                  Start Free Today
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/feed" className="text-slate-400 hover:text-amber transition">
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