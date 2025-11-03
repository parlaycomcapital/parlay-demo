'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'hero' | 'sidebar' | 'navbar' | 'mobile';
  className?: string;
}

const variantSizes = {
  hero: { min: 64, max: 120, sizes: '(max-width: 768px) 96px, (max-width: 1280px) 112px, 120px' },
  sidebar: { min: 40, max: 72, sizes: '(max-width: 1024px) 48px, 72px' },
  navbar: { min: 32, max: 56, sizes: '(max-width: 768px) 32px, 56px' },
  mobile: { min: 40, max: 64, sizes: '(max-width: 640px) 40px, 64px' },
};

export default function Logo({ 
  variant = 'navbar',
  className = '',
}: LogoProps) {
  const sizes = variantSizes[variant];
  
  // Use WebP optimized versions if available, fallback to PNG
  const basePath = variant === 'hero' || variant === 'sidebar'
    ? '/assets/brand/optimized/logo-transparent'
    : '/assets/brand/optimized/logo-solid';

  // Use @2x as default, Next.js will auto-select based on device pixel ratio
  const src = `${basePath}@2x.webp`;

  // Hero variant uses larger sizing
  const heroSizing = variant === 'hero' 
    ? { min: 96, max: 140 }
    : sizes;

  const finalSizes = variant === 'hero' ? heroSizing : sizes;

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
        // Fallback to PNG if WebP is not available
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const fallbackSrc = variant === 'hero' || variant === 'sidebar'
            ? '/assets/brand/logo-transparent.png'
            : '/assets/brand/logo-solid.png';
          target.src = fallbackSrc;
        }}
      />
    </motion.div>
  );
}