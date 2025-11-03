'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, TrendingUp, Users, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import { generateMockAnalytics } from '@/lib/mockDashboardData';
import { stagger, fadeUp } from '@/lib/motion';

interface AnalyticsModuleProps {
  userId: string;
  userName?: string;
}

type TimeRange = '7d' | '30d' | '90d' | 'all';

export default function AnalyticsModule({ userId, userName }: AnalyticsModuleProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const analytics = generateMockAnalytics(timeRange);

  const timeRangeOptions = [
    { value: '7d' as TimeRange, label: 'Last 7 Days' },
    { value: '30d' as TimeRange, label: 'Last 30 Days' },
    { value: '90d' as TimeRange, label: '90 Days' },
    { value: 'all' as TimeRange, label: 'All Time' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl p-12 min-h-[280px] flex flex-col justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(230,62,48,0.15) 0%, rgba(245,166,35,0.15) 100%)',
        }}
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-poppins font-bold text-white tracking-tight mb-4">
            Welcome back, {userName || 'Creator'}! 🔥
          </h2>
          <p className="text-xl text-white/70">
            Your content is performing exceptionally well. Keep up the great work!
          </p>
        </div>

        {/* Decorative orbs */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-ember/30 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        />
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 my-12"
      >
        {/* Left: Section Title */}
        <div>
          <h3 className="text-lg font-poppins font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber" />
            Performance Overview
          </h3>
          <p className="text-sm text-textSecondary mt-1">
            Showing data for selected period
          </p>
        </div>

        {/* Right: Time Range Selector */}
        <div className="flex gap-2 bg-card/50 backdrop-blur-sm p-1 rounded-lg border border-white/10">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${timeRange === option.value
                  ? 'bg-gradient-to-r from-ember to-amber text-white shadow-ember-sm'
                  : 'text-textSecondary hover:text-white hover:bg-white/5'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.15, 0.08)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Views"
          value={analytics.totalViews}
          icon={Eye}
          trend="up"
          changePercent={analytics.viewsChange}
          color="ember"
        />
        <StatCard
          title="Engagement Rate"
          value={analytics.engagementRate}
          suffix="%"
          icon={Heart}
          trend={analytics.engagementRate > 5 ? 'up' : 'down'}
          changePercent={analytics.engagementChange}
          color="amber"
        />
        <StatCard
          title="Win Rate"
          value={analytics.winRate}
          suffix="%"
          icon={TrendingUp}
          trend={analytics.winRate > 60 ? 'up' : 'down'}
          changePercent={analytics.winRateChange}
          color="success"
        />
        <StatCard
          title="Followers"
          value={analytics.followers}
          icon={Users}
          trend="up"
          changePercent={analytics.followersChange}
          color="info"
        />
      </motion.div>

      {/* Charts Placeholder */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center text-white/40 text-lg"
      >
        📊 Performance Charts Coming Next
      </motion.div>

      {/* TODO: Replace with real Supabase query */}
      {/* const { data: analytics } = useAnalytics(userId, timeRange); */}
    </div>
  );
}

