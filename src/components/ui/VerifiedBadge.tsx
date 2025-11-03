'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VerifiedBadge({ 
  size = 'md',
  className = '' 
}: VerifiedBadgeProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      title="Verified Analyst"
    >
      <CheckCircle2 
        size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} 
        className="text-blue-500" 
        fill="currentColor"
        strokeWidth={2}
      />
    </motion.div>
  );
}
