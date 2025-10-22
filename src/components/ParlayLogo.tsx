import Image from 'next/image';
import { useState } from 'react';

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
  const [imageError, setImageError] = useState(false);

  // Fallback to gradient flame icon if image fails to load
  if (imageError) {
    return (
      <div 
        className={`bg-gradient-ember rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
          🔥
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        priority={priority}
        className="select-none"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
