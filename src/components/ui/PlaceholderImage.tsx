'use client';

import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/mockData';

interface PlaceholderImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
}: PlaceholderImageProps) {
  const imageSrc = src && !src.includes('placeholder') ? src : PLACEHOLDER_IMAGE;
  
  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 200}
      className={className}
      onError={(e) => {
        // Fallback to placeholder if image fails to load
        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
      }}
    />
  );
}
