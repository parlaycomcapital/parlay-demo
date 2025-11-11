'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import GradientMotion from './GradientMotion';
import { fadeUp } from '@/lib/motion';

interface PasswordGateProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'Moneymachine69';

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('parlay_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setError(false);
      setIsUnlocked(true);
      sessionStorage.setItem('parlay_unlocked', 'true');
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  // Calculate days until launch
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 69);
  const days = Math.floor((launchDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-navy relative flex items-center justify-center overflow-hidden">
      {/* Parlay's signature gradient background */}
      <GradientMotion />

      {/* Subtle particles - matching Parlay style */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ember rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content Card - Parlay style */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glass card matching Parlay design */}
        <div 
          className="rounded-2xl border p-8 md:p-12 backdrop-blur-md"
          style={{
            background: 'rgba(16, 26, 46, 0.5)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(230,62,48,0.2))',
              }}
            >
              <Logo variant="hero" />
            </motion.div>
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <p className="text-textSecondary text-xs uppercase tracking-[0.2em] mb-3 font-medium">
              Public Launch In
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-poppins font-bold text-white">
                {days}
              </span>
              <span className="text-textSecondary text-lg font-medium">days</span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Password Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-textSecondary text-sm font-medium mb-2">
                Access Code
              </label>
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                animate={error ? { x: [-6, 6, -6, 6, -3, 3, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="w-full px-4 py-3 bg-card/50 border rounded-xl text-white placeholder-textSecondary/50 focus:outline-none focus:border-ember/50 transition-all"
                style={{
                  borderColor: error ? 'rgba(230,62,48,0.5)' : 'rgba(255,255,255,0.1)',
                  boxShadow: error 
                    ? '0 0 20px rgba(230,62,48,0.3)' 
                    : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-ember text-xs mt-2"
                >
                  Incorrect password
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(230,62,48,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 rounded-xl font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #E63E30 0%, #F5A623 100%)',
                boxShadow: '0 4px 12px rgba(230,62,48,0.2)',
              }}
            >
              Unlock
            </motion.button>
          </motion.form>

          {/* Bottom hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-textSecondary/40 text-xs text-center mt-6"
          >
            Invitation required
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
