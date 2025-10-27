'use client';

interface ParlayLogoProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'hero' | 'navbar' | 'footer';
}

export default function ParlayLogo({
  size = 56,
  className = '',
  variant = 'default',
}: ParlayLogoProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'drop-shadow-[0_0_30px_rgba(230,62,48,0.4)] hover:drop-shadow-[0_0_40px_rgba(230,62,48,0.6)] transition-all duration-300';
      case 'navbar':
        return 'hover:scale-105 transition-transform duration-200';
      case 'footer':
        return 'opacity-90 hover:opacity-100 transition-opacity duration-200';
      default:
        return 'hover:scale-105 transition-transform duration-200';
    }
  };

  return (
    <div className={`inline-block ${getVariantStyles()}`}>
      <img
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        className={`object-contain select-none ${className}`}
        style={{
          display: 'block',
          margin: '0 auto',
          filter: variant === 'hero' ? 'brightness(1.1) contrast(1.05)' : 'none',
        }}
      />
    </div>
  );
}
