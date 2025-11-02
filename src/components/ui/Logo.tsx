'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

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
    <div
      className={twMerge('relative flex items-center justify-center', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        aspectRatio: '1 / 1',
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
    >
      <Image
        src={src}
        alt="Parlay logo"
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain', padding: '4px' }}
        priority
        className="select-none"
      />
    </div>
  );
}