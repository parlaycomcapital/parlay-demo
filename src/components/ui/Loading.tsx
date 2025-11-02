'use client';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B132B]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Logo size={100} variant="solid" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-slate-300"
      >
        Loading your Parlay experience...
      </motion.p>
    </div>
  );
}
