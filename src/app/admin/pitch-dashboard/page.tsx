'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download, FileDown, BarChart3, TrendingUp, PieChart, Users } from 'lucide-react';
import KPIBar from '@/components/pitch/KPIBar';
import RevenueChart from '@/components/pitch/RevenueChart';
import Leaderboard from '@/components/pitch/Leaderboard';
import { generatePitchData, simulateUpdates } from '@/lib/pitchData';
import { exportToPDF, downloadCSV } from '@/lib/pitchUtils';

type Scenario = 'conservative' | 'baseline' | 'optimistic' | 'viral';

export default function PitchDashboard() {
  const [scenario, setScenario] = useState<Scenario>('baseline');
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState<any>(null);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadData();
    return () => {
      if (simulationInterval) clearInterval(simulationInterval);
    };
  }, [scenario]);

  const loadData = () => {
    const generatedData = generatePitchData(scenario);
    setData(generatedData);
  };

  const toggleSimulation = () => {
    if (isPlaying) {
      if (simulationInterval) clearInterval(simulationInterval);
      setIsPlaying(false);
      setSimulationInterval(null);
    } else {
      const interval = simulateUpdates(data, 30, (newData) => {
        setData(newData);
      });
      setSimulationInterval(interval);
      setIsPlaying(true);
    }
  };

  const handleExportPDF = () => {
    exportToPDF('pitch-dashboard', 'parlay-investor-dashboard.pdf');
  };

  const handleExportCSV = () => {
    if (!data) return;
    
    const csvData = data.revenueData.map((row: any) => ({
      date: row.date,
      revenue: row.revenue,
    }));
    
    downloadCSV(csvData, 'parlay-revenue-data.csv');
  };

  const resetScenario = () => {
    setIsPlaying(false);
    if (simulationInterval) clearInterval(simulationInterval);
    loadData();
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-navy-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="pitch-dashboard" className="min-h-screen bg-navy-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-heading font-bold text-white mb-2"
            >
              Parlay Investor Dashboard
            </motion.h1>
            <p className="text-slatex-400">
              Live Demo • Mock Data • For Investor Presentation Only
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber/20 text-amber border border-amber/40 hover:bg-amber/30 transition-colors"
            >
              <Download size={18} />
              Export PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <FileDown size={18} />
              CSV
            </motion.button>
          </div>
        </div>

        {/* Scenario Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {(['conservative', 'baseline', 'optimistic', 'viral'] as Scenario[]).map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setScenario(s);
                    setIsPlaying(false);
                    if (simulationInterval) clearInterval(simulationInterval);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    scenario === s
                      ? 'bg-amber text-white shadow-lg shadow-amber/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSimulation}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isPlaying
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white'
                }`}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? 'Pause' : 'Play'} Simulation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetScenario}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* KPIs */}
        <KPIBar kpis={data.kpis} />

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={data.revenueData} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card p-6"
          >
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              <Users className="text-amber" size={24} />
              Signups by Channel
            </h3>
            <div className="space-y-4">
              {data.signupsData.map((channel: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slatex-300">{channel.channel}</span>
                    <span className="text-white font-semibold">{channel.count.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-ember to-amber rounded-full"
                      style={{
                        width: `${(channel.count / Math.max(...data.signupsData.map((c: any) => c.count))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Funnel & Revenue Mix */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="text-amber" size={24} />
              Conversion Funnel
            </h3>
            <div className="space-y-4">
              {data.funnelData.map((stage: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slatex-300">{stage.stage}</span>
                    <span className="text-white font-semibold">
                      {stage.count.toLocaleString()} ({stage.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-amber to-ember rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              <PieChart className="text-amber" size={24} />
              Revenue Mix
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Subscriptions', value: data.revenueMixData.subscriptions, color: 'from-amber to-ember' },
                { label: 'Pay-Per-Analysis', value: data.revenueMixData.payPerAnalysis, color: 'from-ember to-red-600' },
                { label: 'Tips', value: data.revenueMixData.tips, color: 'from-purple-600 to-pink-600' },
              ].map((item, i) => {
                const total = data.revenueMixData.subscriptions + data.revenueMixData.payPerAnalysis + data.revenueMixData.tips;
                const percentage = (item.value / total) * 100;
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slatex-300">{item.label}</span>
                      <span className="text-white font-semibold">
                        ${item.value.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <Leaderboard data={data.leaderboardData} />

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-slatex-500 text-sm">
            This dashboard contains mock data for demonstration purposes only.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
