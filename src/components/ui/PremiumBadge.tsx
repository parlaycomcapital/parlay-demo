'use client';

import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

interface PremiumBadgeProps {
  variant?: 'default' | 'large' | 'gradient';
  showIcon?: boolean;
  className?: string;
}

export default function PremiumBadge({ 
  variant = 'default', 
  showIcon = true,
  className = '' 
}: PremiumBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-amber/10 text-amber border border-amber/20',
    large: 'bg-amber/10 text-amber border border-amber/20 px-3 py-1.5 text-sm',
    gradient: 'bg-gradient-to-r from-ember/20 to-amber/20 text-white border border-amber/30 shadow-ember-sm',
  };

  return (
    <motion.span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {showIcon && <Lock size={12} strokeWidth={2} />}
      <span>Premium</span>
    </motion.span>
  );
}
