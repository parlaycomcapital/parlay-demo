'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface IntroGateProps {
  children: React.ReactNode;
}

export default function IntroGate({ children }: IntroGateProps) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has been seen (client-side only)
    if (typeof window === 'undefined') {
      setShowIntro(false);
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('parlay_intro') === 'seen';
    
    if (!hasSeenIntro) {
      setShowIntro(true);
      
      // Mark as seen after animation
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('parlay_intro', 'seen');
      }, 1200); // 800ms animation + 400ms buffer
      
      return () => clearTimeout(timer);
    } else {
      setShowIntro(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <Logo variant="hero" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

