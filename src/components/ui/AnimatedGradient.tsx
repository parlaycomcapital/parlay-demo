'use client';

import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
  duration?: number;
  variant?: 'linear' | 'radial' | 'ambient';
}

export default function AnimatedGradient({ 
  className = '', 
  duration = 8,
  variant = 'linear'
}: AnimatedGradientProps) {
  const gradients = {
    linear: {
      from: 'linear-gradient(90deg, #E63E30, #F5A623, #FFB800)',
      to: 'linear-gradient(270deg, #E63E30, #F5A623, #FFB800)',
    },
    radial: {
      from: 'radial-gradient(ellipse at center, rgba(255,255,255,0.04), transparent)',
      to: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04), transparent)',
    },
    ambient: {
      from: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.02), transparent)',
      to: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.02), transparent)',
    },
  };

  const gradient = gradients[variant];

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{
        background: [gradient.from, gradient.to, gradient.from],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}
