'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Zap } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: Shield, text: 'Verified Analysts' },
    { icon: Lock, text: 'Secure Payments' },
    { icon: CheckCircle, text: 'Transparent ROI' },
    { icon: Zap, text: 'Real-Time Data' },
  ];

  return (
    <div className="bg-white border-y border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 font-medium">{badge.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}






