'use client';

interface ParlayLogoProps {
  size?: number;
  className?: string;
}

export default function ParlayLogo({ 
  size = 56, 
  className = '' 
}: ParlayLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Parlay Logo"
      width={size}
      height={size}
      className={`object-contain select-none ${className}`}
      style={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
}
