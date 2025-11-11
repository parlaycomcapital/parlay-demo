'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

export default function EnhancedFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo variant="navbar" />
              <span className="text-xl font-bold text-gray-900">Parlay</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              The social network for smart sports betting. Follow experts, track performance, make better decisions.
            </p>
            <div className="flex gap-3">
              {[
                { emoji: '🐦', href: '#', label: 'Twitter' },
                { emoji: '📘', href: '#', label: 'Facebook' },
                { emoji: '📷', href: '#', label: 'Instagram' },
                { emoji: '💼', href: '#', label: 'LinkedIn' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.emoji}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Feed', href: '/feed' },
                { label: 'Leaderboard', href: '/leaderboard' },
                { label: 'Communities', href: '/groups' },
                { label: 'Pricing', href: '/subscribe' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Responsible Use', href: '/responsible-use' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo variant="navbar" />
            <span className="text-sm text-gray-600">© 2025 Parlay. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Made with 🔥 for sports minds</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Alpha v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}





