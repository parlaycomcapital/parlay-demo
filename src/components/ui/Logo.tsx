'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  size?: number;
  solid?: boolean;
  className?: string;
  variant?: 'default' | 'icon' | 'full';
}

export default function Logo({ 
  size = 48, 
  solid = false, 
  className = '',
  variant = 'icon'
}: LogoProps) {
  // Default sizes by context
  // Hero: 84px, Sidebar: 40px, Navbar: 28px
  // Use icon-only logos from public folder
  const src = solid
    ? '/logo.png'
    : '/logotrans.png';

  // For icon variant, use circular container
  // For full variant, allow rectangular display
  const isCircular = variant === 'icon';

  return (
    <div
      className={twMerge(
        isCircular 
          ? 'relative flex items-center justify-center overflow-hidden rounded-full' 
          : 'relative flex items-center justify-center',
        className
      )}
      style={{ 
        width: size, 
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <Image
        src={src}
        alt="Parlay"
        fill={isCircular}
        width={!isCircular ? size : undefined}
        height={!isCircular ? size : undefined}
        style={{ 
          objectFit: isCircular ? 'contain' : 'contain',
          padding: isCircular ? '8px' : '0',
        }}
        priority
        className="select-none"
      />
    </div>
  );
}