'use client';

import { motion } from 'framer-motion';

export default function GradientMotion() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(230, 62, 48, 0.18), transparent 70%),
          radial-gradient(circle at 70% 80%, rgba(245, 166, 35, 0.12), transparent 80%),
          linear-gradient(135deg, #0A1027 0%, #101A2E 100%)
        `,
        backgroundSize: '200% 200%',
      }}
    />
  );
}

