'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeUp } from '@/lib/motion';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  changePercent?: number;
  color?: 'ember' | 'amber' | 'success' | 'info';
}

export default function StatCard({
  title,
  value,
  suffix = '',
  icon: Icon,
  trend,
  changePercent,
  color = 'ember',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Count-up animation with easeOutExpo feel
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // EaseOutExpo curve
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(value * easedProgress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  // Format large numbers
  const formatValue = (val: number): string => {
    if (val >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(1)}M`;
    }
    if (val >= 1_000) {
      return `${(val / 1_000).toFixed(1)}K`;
    }
    return Math.round(val).toLocaleString();
  };

  // Color configurations
  const colorConfig = {
    ember: {
      gradient: 'radial-gradient(circle at 30% 30%, rgba(230,62,48,0.2), rgba(230,62,48,0.05))',
      icon: '#E63E30',
      shadow: '0 8px 16px rgba(230,62,48,0.2)',
      hoverGlow: 'rgba(230,62,48,0.3)',
      hoverShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(230,62,48,0.25)',
    },
    amber: {
      gradient: 'radial-gradient(circle at 30% 30%, rgba(245,166,35,0.2), rgba(245,166,35,0.05))',
      icon: '#F5A623',
      shadow: '0 8px 16px rgba(245,166,35,0.2)',
      hoverGlow: 'rgba(245,166,35,0.3)',
      hoverShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(245,166,35,0.25)',
    },
    success: {
      gradient: 'radial-gradient(circle at 30% 30%, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
      icon: '#10B981',
      shadow: '0 8px 16px rgba(16,185,129,0.2)',
      hoverGlow: 'rgba(16,185,129,0.3)',
      hoverShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.25)',
    },
    info: {
      gradient: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.2), rgba(59,130,246,0.05))',
      icon: '#3B82F6',
      shadow: '0 8px 16px rgba(59,130,246,0.2)',
      hoverGlow: 'rgba(59,130,246,0.3)',
      hoverShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(59,130,246,0.25)',
    },
  };

  const config = colorConfig[color];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotate: -1,
        boxShadow: config.hoverShadow,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className="relative group overflow-hidden rounded-[20px] p-8 cursor-pointer border"
      style={{
        background: 'rgba(16, 26, 46, 0.4)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Icon Container */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: config.gradient,
          boxShadow: config.shadow,
        }}
      >
        <Icon className="w-7 h-7" style={{ color: config.icon }} />
      </div>

      {/* Value */}
      <div className="mb-2">
        <motion.span
          key={displayValue}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-poppins font-bold tracking-tight block"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {formatValue(displayValue)}
          {suffix && (
            <span className="text-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {suffix}
            </span>
          )}
        </motion.span>
      </div>

      {/* Title */}
      <p className="text-sm font-medium tracking-wide uppercase text-white/50">
        {title}
      </p>

      {/* Trend Badge */}
      {trend && changePercent !== undefined && (
        <div
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: trend === 'up' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            color: trend === 'up' ? '#10B981' : '#EF4444',
          }}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{Math.abs(changePercent)}%</span>
        </div>
      )}

      {/* Ambient Glow (hover effect) */}
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: config.hoverGlow,
          filter: 'blur(80px)',
        }}
      />
    </motion.div>
  );
}

