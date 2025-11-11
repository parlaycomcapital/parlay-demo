'use client';

import { motion } from 'framer-motion';

interface SocialProofProps {
  userCount?: number;
  className?: string;
}

export default function SocialProof({ userCount = 2000, className = '' }: SocialProofProps) {
  const avatarColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className="flex -space-x-2">
        {avatarColors.map((color, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} border-2 border-white shadow-md`}
          />
        ))}
      </div>
      <div className="text-sm text-gray-600">
        Join <strong className="text-gray-900">{userCount.toLocaleString()}+ smart bettors</strong>
      </div>
    </motion.div>
  );
}





