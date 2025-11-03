'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import KpiCard from '@/components/admin/KpiCard';
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  UserCheck,
} from 'lucide-react';

const INVESTOR_PITCH_MODE = process.env.NEXT_PUBLIC_PITCH_MODE === 'true';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    mrr: 0,
    activeSubs: 0,
    signups7d: 0,
    dau: 0,
    mau: 0,
    arpu: 0,
  });

  useEffect(() => {
    if (INVESTOR_PITCH_MODE) {
      // Animated mock data for investor pitch
      const targetStats = {
        mrr: 45230,
        activeSubs: 2847,
        signups7d: 124,
        dau: 18420,
        mau: 89240,
        arpu: 15.89,
      };

      // Animate to target values
      const duration = 2000;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setStats({
          mrr: Math.round(targetStats.mrr * eased),
          activeSubs: Math.round(targetStats.activeSubs * eased),
          signups7d: Math.round(targetStats.signups7d * eased),
          dau: Math.round(targetStats.dau * eased),
          mau: Math.round(targetStats.mau * eased),
          arpu: Number((targetStats.arpu * eased).toFixed(2)),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      // Real data fetching would go here
      setStats({
        mrr: 0,
        activeSubs: 0,
        signups7d: 0,
        dau: 0,
        mau: 0,
        arpu: 0,
      });
    }
  }, []);

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1, 0.06)}
        className="mb-8"
      >
        <motion.h1 variants={fadeUp} className="text-3xl font-bold text-white mb-2">
          Admin Overview
        </motion.h1>
        <motion.p variants={fadeUp} className="text-textSecondary">
          {INVESTOR_PITCH_MODE
            ? 'Live analytics dashboard'
            : 'Monitor and manage the platform'}
        </motion.p>
      </motion.div>

      {INVESTOR_PITCH_MODE && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <KpiCard
              label="Monthly Recurring Revenue"
              value={stats.mrr}
              icon={DollarSign}
              format="currency"
              trend={12.4}
              delay={0}
            />
            <KpiCard
              label="Active Subscriptions"
              value={stats.activeSubs}
              icon={Users}
              format="number"
              trend={8.2}
              delay={0.1}
            />
            <KpiCard
              label="7-Day Signups"
              value={stats.signups7d}
              icon={TrendingUp}
              format="number"
              trend={15.7}
              delay={0.2}
            />
            <KpiCard
              label="Daily Active Users"
              value={stats.dau}
              icon={Activity}
              format="number"
              delay={0.3}
            />
            <KpiCard
              label="Monthly Active Users"
              value={stats.mau}
              icon={Users}
              format="number"
              delay={0.4}
            />
            <KpiCard
              label="Average Revenue Per User"
              value={stats.arpu}
              icon={UserCheck}
              format="currency"
              delay={0.5}
            />
          </div>

          {/* Sparkline Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Revenue Trend (Last 30 Days)
            </h3>
            <div className="h-64 flex items-end justify-center gap-1">
              {[...Array(30)].map((_, i) => {
                const height = Math.sin((i / 30) * Math.PI * 2) * 40 + 60 + Math.random() * 30;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    className="flex-1 bg-gradient-to-t from-ember to-amber rounded-t max-w-8"
                  />
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1, 0.06)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.a
          href="/admin/reports"
          variants={fadeUp}
          whileHover={{ scale: 1.02, y: -2 }}
          className="rounded-xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:border-amber/40 transition-all"
        >
          <h3 className="font-semibold text-white mb-2">Reports</h3>
          <p className="text-sm text-textSecondary">Review reported content</p>
        </motion.a>
        <motion.a
          href="/admin/verify"
          variants={fadeUp}
          whileHover={{ scale: 1.02, y: -2 }}
          className="rounded-xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:border-amber/40 transition-all"
        >
          <h3 className="font-semibold text-white mb-2">Verifications</h3>
          <p className="text-sm text-textSecondary">Approve analysts</p>
        </motion.a>
        <motion.a
          href="/admin/groups"
          variants={fadeUp}
          whileHover={{ scale: 1.02, y: -2 }}
          className="rounded-xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:border-amber/40 transition-all"
        >
          <h3 className="font-semibold text-white mb-2">Groups</h3>
          <p className="text-sm text-textSecondary">Approve communities</p>
        </motion.a>
        <motion.a
          href="/admin/logs"
          variants={fadeUp}
          whileHover={{ scale: 1.02, y: -2 }}
          className="rounded-xl bg-card/70 backdrop-blur-lg border border-slate-800/60 p-6 hover:border-amber/40 transition-all"
        >
          <h3 className="font-semibold text-white mb-2">Audit Logs</h3>
          <p className="text-sm text-textSecondary">View activity history</p>
        </motion.a>
      </motion.div>
    </div>
  );
}
