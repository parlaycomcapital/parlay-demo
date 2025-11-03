'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down';
}

export default function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'down'
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'down' ? [0, speed * 100] : [speed * 100, 0]
  );

  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
