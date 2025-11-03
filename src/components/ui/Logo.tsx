'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  variant?: 'solid' | 'transparent';
  className?: string;
  responsive?: boolean;
}

export default function Logo({ 
  size = 48, 
  variant = 'solid', 
  className = '',
  responsive = false,
}: LogoProps) {
  const src = variant === 'solid' ? '/assets/brand/logo-solid.png' : '/assets/brand/logo-transparent.png';

  return (
    <motion.div
      className={twMerge('relative flex items-center justify-center group', className)}
      style={{
        width: responsive ? 'clamp(28px, 5vw, 84px)' : `${size}px`,
        height: responsive ? 'clamp(28px, 5vw, 84px)' : `${size}px`,
        aspectRatio: '1 / 1',
        minWidth: responsive ? '28px' : `${size}px`,
        minHeight: responsive ? '28px' : `${size}px`,
      }}
      animate={{
        opacity: [1, 1, 1],
      }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <Image
        src={src}
        alt="Parlay logo"
        fill
        sizes={`${size}px`}
        style={{ 
          objectFit: 'contain', 
          padding: '4px',
          filter: 'brightness(1.05) contrast(1.05)',
        }}
        priority
        className="select-none relative z-10"
      />
    </motion.div>
  );
}