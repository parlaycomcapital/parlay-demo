'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { TrendingUp, Users, Target, Shield } from 'lucide-react';
import PasswordGate from '@/components/ui/PasswordGate';
import SocialProof from '@/components/ui/SocialProof';
import TrustBadges from '@/components/ui/TrustBadges';
import Testimonials from '@/components/ui/Testimonials';
import FAQ from '@/components/ui/FAQ';
import EnhancedFooter from '@/components/ui/EnhancedFooter';
import StickyCTA from '@/components/ui/StickyCTA';

function HomePageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky CTA (appears on scroll) */}
      <StickyCTA />

      {/* Meta-style Top Nav */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="navbar" />
            <span className="text-xl font-bold text-gray-900">Parlay</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/feed" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
              Feed
            </Link>
            <Link 
              href="/auth"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Meta Style */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6"
            >
              🚀 Now in Alpha — Join Free
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Connect with the best{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                sports analysts
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Follow verified experts, see transparent performance metrics, and make smarter sports betting decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth"
                  className="block px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors text-center shadow-lg shadow-blue-600/20"
                >
                  Create Free Account
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/feed"
                  className="block px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Explore Feed
                </Link>
              </motion.div>
            </div>

            <SocialProof userCount={2134} />

            <p className="text-sm text-gray-500 mt-6 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Free forever. No credit card required.
            </p>
          </motion.div>

          {/* Right: Product Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Analyst Card Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      Mike Thompson
                      <span className="text-blue-500">✓</span>
                    </div>
                    <div className="text-sm text-gray-500">NFL Analyst • 73% Win Rate</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                  >
                    Follow
                  </motion.button>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">NFL • 2 hours ago</div>
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    Chiefs -3.5 vs Bills
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Chiefs have home field advantage and Mahomes is 8-2 vs AFC East. Bills struggling on the road (2-4). Weather favors KC offense.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <span>👍</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <span>💬</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      87% Confidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Win Rate', value: '73%', color: 'from-green-400 to-green-500' },
                  { label: 'ROI', value: '+18%', color: 'from-blue-400 to-blue-500' },
                  { label: 'Streak', value: '8', color: 'from-orange-400 to-red-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                    <div className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats Bar - Meta Style */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Verified Analysts', color: 'text-blue-600' },
              { value: '2,000+', label: 'Active Users', color: 'text-purple-600' },
              { value: '100+', label: 'Daily Insights', color: 'text-green-600' },
              { value: '73%', label: 'Avg Win Rate', color: 'text-orange-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`text-5xl font-extrabold ${stat.color} mb-3`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Meta Style Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Everything you need to win
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Professional tools for serious sports bettors
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Transparent Tracking',
                description: 'See real ROI and win rates for every analyst',
                color: 'blue',
              },
              {
                icon: Users,
                title: 'Verified Experts',
                description: 'Only proven analysts can post premium content',
                color: 'green',
              },
              {
                icon: Target,
                title: 'Smart Analytics',
                description: 'Data-driven insights and performance metrics',
                color: 'purple',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your data is protected and encrypted',
                color: 'orange',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              const colorMap = {
                blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:shadow-blue-600/20' },
                green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:shadow-green-600/20' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:shadow-purple-600/20' },
                orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:shadow-orange-600/20' },
              };
              const colors = colorMap[feature.color as keyof typeof colorMap];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all ${colors.hover}`}
                >
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section - Meta Style */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to level up your game?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of smart bettors already using Parlay to make better decisions
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth"
                className="inline-block px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:bg-gray-50 transition-colors shadow-2xl"
              >
                Get Started — It's Free
              </Link>
            </motion.div>
            <p className="text-sm text-blue-100 mt-6">
              ✓ No credit card required  •  ✓ Cancel anytime  •  ✓ 2,000+ happy users
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}

export default function HomePage() {
  return (
    <PasswordGate>
      <HomePageContent />
    </PasswordGate>
  );
}
