'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  size?: number;
  solid?: boolean;
  className?: string;
}

export default function Logo({ size = 48, solid = false, className = '' }: LogoProps) {
  const src = solid
    ? '/assets/brand/logo-solid.png'
    : '/assets/brand/logo-transparent.png';

  return (
    <div
      className={twMerge(
        'relative flex items-center justify-center overflow-hidden rounded-full',
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt="Parlay logo"
        fill
        style={{ objectFit: 'contain', padding: '4px' }}
        priority
      />
    </div>
  );
}