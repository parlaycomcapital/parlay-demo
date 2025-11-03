'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import ParticleField from '@/components/ui/ParticleField';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = '' }: AuthCardProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10 relative overflow-hidden">
      {/* Background effects */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, rgba(178,66,48,0.15), transparent 70%)`,
            }}
          />
          <ParticleField />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
        className={`relative w-full max-w-md bg-card/70 backdrop-blur-lg p-8 rounded-2xl border border-slate-800/60 shadow-[0_0_40px_rgba(245,166,35,0.1)] z-10 ${className}`}
      >
        {children}
      </motion.div>
    </main>
  );
}

