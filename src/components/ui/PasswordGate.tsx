'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface PasswordGateProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'Moneymachine69';

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(false);

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
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  // Calculate countdown
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 69);
  const days = Math.floor((launchDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-navy relative flex items-center justify-center overflow-hidden">
      {/* Ultra-subtle animated gradient - BARELY visible */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(230,62,48,0.04), transparent 60%)',
            'radial-gradient(circle at 60% 40%, rgba(230,62,48,0.04), transparent 60%)',
            'radial-gradient(circle at 40% 60%, rgba(230,62,48,0.04), transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(230,62,48,0.04), transparent 60%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo with premium glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <Logo variant="hero" />
            {/* Ember glow - subtle */}
            <motion.div
              animate={{
                opacity: [0.08, 0.15, 0.08],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-8 bg-ember/20 blur-[60px] -z-10"
            />
          </div>
        </motion.div>

        {/* Countdown - Minimal & Premium */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-4 font-medium">
            Public Launch
          </div>
          <div className="inline-flex items-baseline gap-3">
            <motion.div
              key={days}
              initial={{ opacity: 0.6, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-6xl font-poppins font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {days}
            </motion.div>
            <span className="text-white/40 text-sm font-medium tracking-wide">days</span>
          </div>
        </motion.div>

        {/* Password Input - Ultra Premium */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-6"
        >
          {/* Input Field */}
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: focused 
                  ? ['0 0 0 0 rgba(230,62,48,0)', '0 0 0 1px rgba(230,62,48,0.3)', '0 0 20px 0 rgba(230,62,48,0.15)']
                  : '0 0 0 0 rgba(230,62,48,0)',
              }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="•  •  •  •  •  •  •  •"
                autoFocus
                animate={error ? { 
                  x: [-8, 8, -8, 8, -4, 4, 0],
                  borderColor: ['rgba(230,62,48,0.5)', 'rgba(230,62,48,0.8)', 'rgba(230,62,48,0.5)'],
                } : {}}
                transition={{ duration: 0.5 }}
                className="w-full px-8 py-5 bg-card/30 backdrop-blur-xl border border-white/[0.08] rounded-2xl text-white text-center font-medium tracking-[0.3em] text-lg focus:outline-none transition-all placeholder-white/20"
                style={{
                  boxShadow: error 
                    ? '0 0 30px rgba(230,62,48,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : focused
                    ? '0 0 30px rgba(230,62,48,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              />

              {/* Subtle top highlight */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </motion.div>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute -bottom-6 left-0 right-0 text-center"
                >
                  <span className="text-ember/80 text-xs font-medium tracking-wide">
                    Access Denied
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit - Invisible until hover */}
          <motion.button
            type="submit"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 40px rgba(230,62,48,0.25)',
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-5 rounded-2xl font-semibold tracking-wide transition-all relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(230,62,48,0.15) 0%, rgba(245,166,35,0.15) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-ember to-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Text */}
            <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">
              Enter
            </span>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>
        </motion.form>

        {/* Subtle hint - barely visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-white/[0.12] text-[10px] uppercase tracking-[0.3em] font-medium">
            Invitation Required
          </p>
        </motion.div>
      </div>

      {/* Vignette - dark edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(11,19,43,0.4) 70%, rgba(11,19,43,0.8) 100%)',
        }}
      />
    </div>
  );
}
