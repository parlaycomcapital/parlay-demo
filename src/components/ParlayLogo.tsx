import Image from 'next/image';
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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if image loads successfully
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = '/logo.png';
  }, []);

  // Show loading state
  if (!imageLoaded && !imageError) {
    return (
      <div 
        className={`bg-slate/30 rounded-lg flex items-center justify-center animate-pulse ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-slate-400 text-xs">Loading...</span>
      </div>
    );
  }

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
      <img
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        className="select-none"
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
