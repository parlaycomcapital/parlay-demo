'use client';

import Image from 'next/image';

interface ParlayLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export default function ParlayLogo({ 
  size = 64, 
  className = '', 
  priority = false 
}: ParlayLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        priority={priority}
        className="select-none object-contain"
        style={{ 
          width: size, 
          height: size,
          objectFit: 'contain' 
        }}
      />
    </div>
  );
}
