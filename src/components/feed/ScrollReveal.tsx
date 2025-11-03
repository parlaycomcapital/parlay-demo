'use client';

import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export default function ScrollReveal({ 
  children, 
  delay = 0.08,
  direction = 'up',
  distance = 20
}: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const initialPositions = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
  };

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration: 0.5, 
        delay,
        ease: 'easeOut' as const
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={initialPositions[direction]}
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}