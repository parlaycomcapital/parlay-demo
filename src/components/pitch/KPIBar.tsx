'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Percent, UserCheck, Activity } from 'lucide-react';
import CountUp from 'react-countup';

interface KPI {
  label: string;
  value: number;
  icon: any;
  prefix?: string;
  suffix?: string;
  color: string;
}

interface KPIBarProps {
  kpis: {
    mrr: number;
    wau: number;
    signups7d: number;
    conversionRate: number;
    arpu: number;
    activeSubscribers: number;
  };
}

export default function KPIBar({ kpis }: KPIBarProps) {
  const items: KPI[] = [
    {
      label: 'Monthly Recurring Revenue',
      value: kpis.mrr,
      icon: DollarSign,
      prefix: '$',
      suffix: 'k',
      color: 'text-ember',
    },
    {
      label: 'Weekly Active Users',
      value: kpis.wau / 1000,
      icon: Users,
      suffix: 'k',
      color: 'text-amber',
    },
    {
      label: 'New Signups (7d)',
      value: kpis.signups7d,
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      label: 'Conversion Rate',
      value: kpis.conversionRate,
      icon: Percent,
      suffix: '%',
      color: 'text-info',
    },
    {
      label: 'Avg Revenue per User',
      value: kpis.arpu,
      icon: DollarSign,
      prefix: '$',
      suffix: '',
      color: 'text-warning',
    },
    {
      label: 'Active Subscribers',
      value: kpis.activeSubscribers,
      icon: Activity,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="card p-6 hover:border-amber/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ 
                background: item.color.includes('ember') 
                  ? 'linear-gradient(to bottom right, rgba(230,62,48,0.2), rgba(230,62,48,0.1))'
                  : item.color.includes('amber')
                  ? 'linear-gradient(to bottom right, rgba(245,166,35,0.2), rgba(245,166,35,0.1))'
                  : 'rgba(16, 185, 129, 0.1)'
              }}>
                <item.icon className={item.color} size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slatex-500 mb-1">{item.label}</div>
                <div className="text-2xl font-bold text-white">
                  {item.prefix && item.prefix}
                  <CountUp
                    end={item.value}
                    decimals={item.suffix === '%' ? 1 : item.suffix === 'k' ? 1 : 0}
                    duration={2}
                    separator=","
                  />
                  {item.suffix && item.suffix}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
