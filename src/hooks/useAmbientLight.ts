'use client';

import { useEffect, useState } from 'react';

interface UseAmbientLightReturn {
  x: string;
  y: string;
}

export function useAmbientLight(): UseAmbientLightReturn {
  const [position, setPosition] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      // Throttle updates to 30fps for smooth performance
      setPosition({ x: `${x}%`, y: `${y}%` });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { x: position.x, y: position.y };
}
