'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  variant?: 'solid' | 'transparent';
  className?: string;
}

export default function Logo({ 
  size = 48, 
  variant = 'solid', 
  className = '',
}: LogoProps) {
  const src = variant === 'solid' ? '/assets/brand/logo-solid.png' : '/assets/brand/logo-transparent.png';

  return (
    <motion.div
      className={twMerge('relative flex items-center justify-center group', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        aspectRatio: '1 / 1',
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
      animate={{
        filter: [
          'drop-shadow(0 0 8px rgba(230,62,48,0.3))',
          'drop-shadow(0 0 16px rgba(245,166,35,0.4))',
          'drop-shadow(0 0 8px rgba(230,62,48,0.3))',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Animated gradient stroke glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-60 blur-lg animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(230,62,48,0.3), rgba(245,166,35,0.3), transparent)',
        }}
      />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(245, 166, 35, 0.6), transparent)',
        }}
      />
      
      <Image
        src={src}
        alt="Parlay logo"
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain', padding: '4px' }}
        priority
        className="select-none relative z-10"
      />
    </motion.div>
  );
}