'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Logo from '@/components/ui/Logo';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GradientField from '@/components/ui/GradientField';
import { useAmbientLight } from '@/hooks/useAmbientLight';
import Link from 'next/link';
import { ArrowDown, TrendingUp, Shield, Users, Zap, MessageSquare, Crown, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/feed/ScrollReveal';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  const { scrollY } = useScroll();
  const { x, y } = useAmbientLight();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const logoY = useTransform(scrollY, [0, 500], [0, 75]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Store locally for demo
    console.log('Alpha signup:', email);
    setSubmitted(true);
    setEmail('');
    
    // Reset after 5s
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinematic background layers */}
      <GradientField particleCount={40} intensity={0.15} />
      <AnimatedGradient variant="ambient" className="opacity-20" />
      
      {/* Cursor-reactive ambient lighting */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle 1000px at ${x} ${y}, rgba(255,255,255,0.04), transparent)`,
          transition: 'background 0.1s ease-out',
        }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container-narrow text-center">
          <motion.div style={{ y: logoY }}>
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-8"
            >
              <div className="relative inline-block backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-2">
                <Logo variant="hero" className="mx-auto" />
              </div>
            </motion.div>
          </motion.div>
          
          <ScrollReveal delay={0.1}>
            <motion.h1 
              className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Smart Sports.{' '}
              <span className="gradient-text">Smarter Minds.</span>
            </motion.h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-slatex-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the first community where data meets intuition.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/register" 
                  className="btn-grad px-10 py-4 text-lg inline-block"
                >
                  Join Alpha Access
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/feed"
                  className="px-10 py-4 rounded-xl border border-amber/40 text-amber hover:bg-amber/10 transition-all duration-fast font-medium inline-block"
                >
                  View Demo
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slatex-400 text-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="relative py-32 border-t border-slate-800 z-10">
        <div className="container-wide px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-heading font-bold text-center mb-4 text-white">
              Everything You Need to <span className="gradient-text">Win</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-slatex-400 text-center mb-16 max-w-3xl mx-auto">
              Real-time insights, verified experts, and transparent performance tracking.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Shield, title: 'Verified Analyst Tracking', color: 'text-amber' },
              { icon: MessageSquare, title: 'Realtime Feed', color: 'text-ember' },
              { icon: Crown, title: 'Premium Insights', color: 'text-amber' },
              { icon: BarChart3, title: 'Transparent ROI', color: 'text-success' },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.05 * i}>
                <motion.div
                  className="glass card p-8 text-center"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center mx-auto mb-4 ${feature.color}`}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(230,62,48,0.2)',
                        '0 0 30px rgba(230,62,48,0.3)',
                        '0 0 20px rgba(230,62,48,0.2)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <feature.icon size={32} />
                  </motion.div>
                  <h3 className="text-lg font-heading font-semibold text-white">{feature.title}</h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mock App Preview */}
          <ScrollReveal delay={0.3}>
            <motion.div
              className="relative max-w-5xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="card p-8 overflow-hidden">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="card p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-4 bg-slate-700 rounded w-32 mb-2" />
                          <div className="h-3 bg-slate-800 rounded w-full mb-1" />
                          <div className="h-3 bg-slate-800 rounded w-3/4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Community & Analysts Section */}
      <section className="relative py-32 border-t border-slate-800 z-10 overflow-hidden">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-4xl font-heading font-bold text-center mb-4 text-white">
              Trusted by <span className="gradient-text">Analysts</span>. Powered by Fans.
            </h2>
          </ScrollReveal>
          
          {/* Animated stat counters */}
          <div className="grid md:grid-cols-3 gap-12 mb-20 mt-16">
            {[
              { value: 5000, suffix: '+', label: 'Active Users' },
              { value: 300, suffix: '+', label: 'Verified Analysts' },
              { value: 98, suffix: '%', label: 'Verified Profiles' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    <Counter end={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-slatex-400 text-lg">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/register" 
                className="btn-grad px-8 py-3 text-base inline-flex items-center gap-2"
              >
                Become an Analyst
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Storytelling Section */}
      <section className="relative py-40 border-t border-slate-800 z-10">
        <div className="container-narrow text-center">
          <div className="space-y-8">
            {[
              { word: 'Insight.', delay: 0 },
              { word: 'Trust.', delay: 0.3 },
              { word: 'Community.', delay: 0.6 },
              { word: 'Parlay.', delay: 0.9 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: item.delay }}
                className="text-6xl md:text-8xl font-heading font-bold text-white"
                style={{
                  background: 'linear-gradient(90deg, rgba(230,62,48,0.5), rgba(245,166,35,0.5))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 60px rgba(230,62,48,0.3)',
                }}
              >
                {item.word}
              </motion.div>
            ))}
          </div>
          
          <ScrollReveal delay={1.2}>
            <p className="text-xl md:text-2xl text-slatex-400 mt-16 max-w-3xl mx-auto leading-relaxed space-y-4">
              <div>We're redefining how sports insights are shared.</div>
              <div>Where expertise becomes influence.</div>
              <div>And data builds trust.</div>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-slate-800 z-10">
        <div className="container-wide px-6">
          <ScrollReveal>
            <motion.div
              className="card max-w-2xl mx-auto p-12 text-center relative overflow-hidden"
              whileHover={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 30px rgba(230, 62, 48, 0.15)' }}
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-ember/10 to-amber/10 pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-heading font-bold mb-4 text-white">
                  Join the <span className="gradient-text">Free Alpha</span>
                </h2>
                <p className="text-lg text-slatex-400 mb-8">
                  Experience Parlay early. Shape the future of sports analysis.
                </p>
                
                {!submitted ? (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="input flex-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <motion.button
                      type="submit"
                      className="btn-grad px-8 py-3 text-base"
                      whileTap={{ scale: 0.95 }}
                    >
                      Request Access
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-bold text-success flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={32} />
                    You're on the list!
                  </motion.div>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
