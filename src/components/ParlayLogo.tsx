'use client';

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
  // Simple static approach - show the logo with fallback styling
  return (
    <div className={className}>
      <img
        src="/logo.png"
        alt="Parlay Logo"
        width={size}
        height={size}
        className="select-none object-contain"
        style={{ 
          width: size, 
          height: size,
          objectFit: 'contain' 
        }}
        onError={(e) => {
          // Fallback to gradient flame icon if image fails
          e.currentTarget.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = `bg-gradient-ember rounded-lg flex items-center justify-center ${className}`;
          fallback.style.width = `${size}px`;
          fallback.style.height = `${size}px`;
          fallback.innerHTML = `<span class="text-white font-bold" style="font-size: ${size * 0.4}px">🔥</span>`;
          e.currentTarget.parentNode?.appendChild(fallback);
        }}
      />
    </div>
  );
}
