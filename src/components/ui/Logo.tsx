'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'hero' | 'sidebar' | 'navbar' | 'mobile';
  className?: string;
}

const variantSizes = {
  hero: { min: 80, max: 100, sizes: '(max-width: 768px) 80px, (max-width: 1280px) 90px, 100px' },
  sidebar: { min: 36, max: 44, sizes: '(max-width: 1024px) 36px, 44px' },
  navbar: { min: 36, max: 44, sizes: '(max-width: 768px) 36px, 44px' },
  mobile: { min: 36, max: 44, sizes: '(max-width: 640px) 36px, 44px' },
};

export default function Logo({ 
  variant = 'navbar',
  className = '',
}: LogoProps) {
  const sizes = variantSizes[variant];
  
  // Use WebP optimized versions if available, fallback to PNG
  const basePath = variant === 'hero' || variant === 'sidebar'
    ? '/assets/brand/logo-transparent'
    : '/assets/brand/logo-solid';

  // Try optimized first, fallback to regular
  const src = `${basePath}.png`;

  const finalSizes = sizes;

  return (
    <motion.div
      className={twMerge('relative flex items-center justify-center overflow-hidden', className)}
      style={{
        width: `clamp(${finalSizes.min}px, ${variant === 'hero' ? '12vw' : variant === 'sidebar' ? '6vw' : variant === 'navbar' ? '4vw' : '8vw'}, ${finalSizes.max}px)`,
        height: `clamp(${finalSizes.min}px, ${variant === 'hero' ? '12vw' : variant === 'sidebar' ? '6vw' : variant === 'navbar' ? '4vw' : '8vw'}, ${finalSizes.max}px)`,
        borderRadius: variant === 'hero' ? '12px' : '8px',
        aspectRatio: '1 / 1',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
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
        sizes={sizes.sizes}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority={variant === 'hero'}
        className="select-none"
        quality={90}
        onError={(e) => {
          console.error('Logo failed to load:', src);
        }}
      />
    </motion.div>
  );
}