'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function FlameIntro() {
  const [showFlame, setShowFlame] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window === 'undefined') {
      setShouldRender(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    // Check if flame intro has been seen
    const hasSeenFlame = sessionStorage.getItem('parlay_flame_intro') === 'seen';
    if (hasSeenFlame) {
      setShouldRender(false);
      return;
    }

    // Show flame animation
    setShowFlame(true);

    // Mark as seen after animation completes
    const timer = setTimeout(() => {
      setShowFlame(false);
      sessionStorage.setItem('parlay_flame_intro', 'seen');
      
      // Unmount after fade out
      setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }, 900); // 900ms total animation

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {showFlame && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy"
          aria-hidden="true"
        >
          {/* Logo container */}
          <div className="relative flex items-center justify-center" style={{ width: '120px', height: '120px' }}>
            <Logo variant="hero" />
            
            {/* Flame streak SVG */}
            <motion.svg
              className="absolute inset-0 pointer-events-none"
              width="120"
              height="120"
              viewBox="0 0 120 120"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, times: [0, 0.3, 1] }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B24230" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F5A623" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#B24230" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 60 Q 60 20 110 60"
                stroke="url(#flameGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.9,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                }}
              />
              {/* Additional flame particles */}
              {[...Array(5)].map((_, i) => {
                const angle = (i / 5) * Math.PI * 2;
                const radius = 20;
                return (
                  <motion.circle
                    key={i}
                    cx="60"
                    cy="60"
                    r="2"
                    fill="#F5A623"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                      cx: [60, 60 + Math.cos(angle) * radius],
                      cy: [60, 60 + Math.sin(angle) * radius],
                    }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.1,
                      times: [0, 0.5, 1],
                    }}
                  />
                );
              })}
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

