'use client';

import { motion } from 'framer-motion';
import { Medal, TrendingUp, Users, Award } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis } from 'recharts';

interface LeaderboardProps {
  data: Array<{ name: string; roi: number; winRate: number; followers: number; sparkline: number[] }>;
}

export default function Leaderboard({ data }: LeaderboardProps) {
  const getMedal = (index: number) => {
    if (index === 0) return <Medal className="text-yellow-500" size={24} />;
    if (index === 1) return <Medal className="text-gray-400" size={24} />;
    if (index === 2) return <Medal className="text-orange-600" size={24} />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card p-6"
    >
      <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="text-amber" size={24} />
        Top Analysts Leaderboard
      </h3>
      <div className="space-y-3">
        {data.map((analyst, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-8 flex justify-center">
              {getMedal(index) || <span className="text-slatex-500 text-sm font-bold">#{index + 1}</span>}
            </div>
            
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 flex items-center justify-center flex-shrink-0">
                <Award className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{analyst.name}</div>
                <div className="text-xs text-slatex-500">Verified Analyst</div>
              </div>
            </div>

            <div className="hidden md:block w-32 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyst.sparkline}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={analyst.roi > 15 ? '#10B981' : analyst.roi > 10 ? '#F5A623' : '#E63E30'}
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="index" hide />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 text-right">
              <div>
                <div className="text-lg font-bold text-white">{analyst.roi.toFixed(1)}%</div>
                <div className="text-xs text-slatex-500">ROI</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{analyst.winRate.toFixed(1)}%</div>
                <div className="text-xs text-slatex-500">Win Rate</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white flex items-center gap-1 justify-end">
                  <Users size={14} className="text-slatex-500" />
                  {(analyst.followers / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-slatex-500">Followers</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
