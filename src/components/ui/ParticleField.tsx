'use client';

import { useEffect, useState, useCallback, useRef as useReactRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Initialize particles
    const particleCount = 75;
    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.1 + 0.05,
    }));
    setParticles(initialParticles);
  }, [reducedMotion]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, reducedMotion]);

  // Update particles to follow cursor with lag (throttled via RAF)
  const particlesRef = useReactRef(particles);
  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  useEffect(() => {
    if (reducedMotion || particles.length === 0) return;

    let rafId: number;
    let lastUpdate = 0;
    const throttle = 16; // ~60fps

    const updateParticles = (timestamp: number) => {
      if (timestamp - lastUpdate < throttle) {
        rafId = requestAnimationFrame(updateParticles);
        return;
      }

      setParticles((prev) =>
        prev.map((particle) => {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 200;

          if (distance < influenceRadius) {
            const influence = 1 - distance / influenceRadius;
            const lag = 0.3; // Lag factor
            return {
              ...particle,
              x: particle.x + dx * influence * lag * 0.1,
              y: particle.y + dy * influence * lag * 0.1,
            };
          }

          // Slow drift
          return {
            ...particle,
            x: particle.x + (Math.random() - 0.5) * 0.5,
            y: particle.y + (Math.random() - 0.5) * 0.5,
          };
        })
      );

      lastUpdate = timestamp;
      rafId = requestAnimationFrame(updateParticles);
    };

    rafId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos, particles.length, reducedMotion]);

  if (reducedMotion || particles.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-[1]"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-amber/50"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}

