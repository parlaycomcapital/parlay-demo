'use client';

import { useState, useEffect } from 'react';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple fallback approach - try to load the image, fallback if it fails
  const handleImageError = () => {
    setImageError(true);
  };

  // Show loading state during SSR
  if (!mounted) {
    return (
      <div 
        className={`bg-slate/30 rounded-lg flex items-center justify-center animate-pulse ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-slate-400 text-xs">Loading...</span>
      </div>
    );
  }

  // If image fails to load, show gradient flame fallback
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

  // Try to load the actual logo
  return (
    <div className={className}>
      <img
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        className="select-none object-contain"
        onError={handleImageError}
        style={{ 
          width: size, 
          height: size,
          objectFit: 'contain' 
        }}
      />
    </div>
  );
}
