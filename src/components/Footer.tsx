'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 md:px-8 border-t border-slate-800/60">
      <div className="max-w-[1100px] mx-auto">
        {/* Brand glow divider */}
        <div
          className="h-px w-full mb-8"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.3), transparent)',
          }}
        />

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-poppins font-semibold text-white mb-4">Parlay</h3>
            <p className="text-textSecondary text-sm">
              The social network for smart sports insights.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-textSecondary hover:text-amber transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-textSecondary hover:text-amber transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-textSecondary hover:text-amber transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <Link
                href="/help"
                className="text-textSecondary hover:text-amber transition-colors text-sm"
              >
                Help Center
              </Link>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-slate-800/60">
          <p className="text-textSecondary text-sm">
            © Parlay ™ 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
