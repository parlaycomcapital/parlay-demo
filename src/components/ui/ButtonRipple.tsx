'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonRippleProps {
  x: number;
  y: number;
  onComplete: () => void;
}

function Ripple({ x, y, onComplete }: ButtonRippleProps) {
  return (
    <motion.span
      className="absolute rounded-full bg-amber/30 pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 20,
        height: 20,
        x: -10,
        y: -10,
      }}
      animate={{
        scale: 10,
        opacity: [0.5, 0.3, 0],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    />
  );
}

export default function useRipple() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples([...ripples, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples(ripples.filter((r) => r.id !== id));
  };

  const RippleLayer = () => (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          x={ripple.x}
          y={ripple.y}
          onComplete={() => removeRipple(ripple.id)}
        />
      ))}
    </AnimatePresence>
  );

  return { addRipple, RippleLayer };
}
