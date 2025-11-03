'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  format?: 'number' | 'currency' | 'percentage';
  trend?: number;
  delay?: number;
}

export default function KpiCard({
  label,
  value,
  icon: Icon,
  format = 'number',
  trend,
  delay = 0,
}: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(Math.round(val));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:border-amber/40 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-ember/20 to-amber/20">
          <Icon size={24} className="text-amber" />
        </div>
        {trend !== undefined && (
          <span
            className={`text-sm font-medium ${
              trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-textSecondary'
            }`}
          >
            {trend > 0 ? '+' : ''}
            {trend.toFixed(1)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-bold text-white mb-1">
          {formatValue(displayValue)}
        </p>
        <p className="text-sm text-textSecondary">{label}</p>
      </div>
    </motion.div>
  );
}

