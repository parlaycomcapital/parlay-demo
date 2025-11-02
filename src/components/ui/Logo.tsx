'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function Logo({ size = 36, solid = false, className = '' }) {
  const src = solid ? '/assets/brand/logo-solid.png' : '/assets/brand/logo-transparent.png';

  return (
    <Image
      src={src}
      alt="Parlay logo"
      width={size}
      height={size}
      priority
      className={twMerge('object-contain select-none', className)}
    />
  );
}