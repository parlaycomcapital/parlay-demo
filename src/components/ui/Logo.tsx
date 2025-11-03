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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
        style={{
          background: 'radial-gradient(circle, rgba(245, 166, 35, 0.4), transparent)',
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