'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'hero' | 'sidebar' | 'navbar' | 'mobile';
  className?: string;
}

const variantSizes = {
  hero: { min: 64, max: 120 },
  sidebar: { min: 40, max: 72 },
  navbar: { min: 32, max: 56 },
  mobile: { min: 40, max: 64 },
};

export default function Logo({ 
  variant = 'navbar',
  className = '',
}: LogoProps) {
  const sizes = variantSizes[variant];
  const src = variant === 'hero' || variant === 'sidebar' 
    ? '/assets/brand/logo-transparent.png' 
    : '/assets/brand/logo-solid.png';

  return (
    <motion.div
      className={twMerge('relative flex items-center justify-center overflow-hidden', className)}
      style={{
        width: `clamp(${sizes.min}px, ${variant === 'hero' ? '10vw' : variant === 'sidebar' ? '6vw' : variant === 'navbar' ? '4vw' : '8vw'}, ${sizes.max}px)`,
        height: `clamp(${sizes.min}px, ${variant === 'hero' ? '10vw' : variant === 'sidebar' ? '6vw' : variant === 'navbar' ? '4vw' : '8vw'}, ${sizes.max}px)`,
        borderRadius: variant === 'hero' ? '12px' : '8px',
        aspectRatio: '1 / 1',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        sizes={`${sizes.max}px`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority={variant === 'hero'}
        className="select-none"
      />
    </motion.div>
  );
}