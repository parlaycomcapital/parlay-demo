'use client';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type LogoProps = {
  variant?: 'transparent' | 'solid';
  size?: number;
  className?: string;
};

export default function Logo({ variant = 'transparent', size = 64, className = '' }: LogoProps) {
  const src =
    variant === 'solid' ? '/assets/brand/logo-solid.png' : '/assets/brand/logo-transparent.png';

  return (
    <Image
      src={src}
      alt={`Parlay ${variant} logo`}
      width={size}
      height={size}
      priority
      className={twMerge(
        'object-contain select-none transition-transform duration-300 hover:scale-[1.03]',
        variant === 'solid'
          ? 'rounded-2xl shadow-lg shadow-amber-500/30'
          : 'drop-shadow-[0_0_16px_rgba(230,62,48,0.3)]',
        className
      )}
    />
  );
}
