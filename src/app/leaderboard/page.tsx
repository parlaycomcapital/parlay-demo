'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users, Award } from 'lucide-react';
import { supabase, User } from '@/lib/supabaseClient';
import { isPlaceholderMode, mockUsers } from '@/lib/mockData';
import ScrollReveal from '@/components/feed/ScrollReveal';
import Link from 'next/link';

interface AnalystRanking {
  user: User;
  roi: number;
  win_rate: number;
  total_predictions: number;
  followers_count: number;
  trust_score: number;
  rank: number;
}

export default function LeaderboardPage() {
  const [rankings, setRankings] = useState<AnalystRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'roi' | 'win_rate' | 'followers'>('roi');

  useEffect(() => {
    fetchRankings();
  }, [filter]);

  const fetchRankings = async () => {
    setLoading(true);

    // Use mock rankings in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockRankings: AnalystRanking[] = mockUsers
        .filter(u => u.role === 'creator')
        .map((user, index) => ({
          user: user as User,
          roi: user.roi || 0,
          win_rate: user.win_rate || 0,
          total_predictions: 156 + Math.floor(Math.random() * 100),
          followers_count: user.followers_count || 0,
          trust_score: Math.min(100, (user.roi || 0) * 2 + (user.win_rate || 0) * 0.8),
          rank: index + 1,
        }))
        .sort((a, b) => {
          switch (filter) {
            case 'roi':
              return b.roi - a.roi;
            case 'win_rate':
              return b.win_rate - a.win_rate;
            case 'followers':
              return b.followers_count - a.followers_count;
            default:
              return b.trust_score - a.trust_score;
          }
        })
        .map((r, idx) => ({ ...r, rank: idx + 1 }));

      setRankings(mockRankings);
      setLoading(false);
      return;
    }

    try {
      // Fetch creators with their stats
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'creator')
        .order('roi', { ascending: false });

      if (error) throw error;

      // Calculate rankings
      const calculatedRankings: AnalystRanking[] = (users || [])
        .map((user) => ({
          user: user as User,
          roi: user.roi || 0,
          win_rate: user.win_rate || 0,
          total_predictions: 156, // TODO: Calculate from posts
          followers_count: user.followers_count || 0,
          trust_score: Math.min(
            100,
            (user.roi || 0) * 2 + (user.win_rate || 0) * 0.8
          ),
          rank: 0,
        }))
        .sort((a, b) => {
          switch (filter) {
            case 'roi':
              return b.roi - a.roi;
            case 'win_rate':
              return b.win_rate - a.win_rate;
            case 'followers':
              return b.followers_count - a.followers_count;
            default:
              return b.trust_score - a.trust_score;
          }
        })
        .map((r, idx) => ({ ...r, rank: idx + 1 }));

      setRankings(calculatedRankings);
    } catch (error: any) {
      console.warn('Error fetching rankings:', error.message);
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber/70';
    return 'text-slatex-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={24} className="text-amber" />;
    if (rank === 2) return <Trophy size={20} className="text-slate-400" />;
    if (rank === 3) return <Trophy size={18} className="text-amber/70" />;
    return <span className="text-lg font-bold">{rank}</span>;
  };

  return (
    <div>
      <div className="mb-5 lg:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
          <Trophy size={32} className="text-amber" />
          Analyst Leaderboard
        </h1>
        <p className="text-slatex-400 text-sm">
          Top performing analysts ranked by performance metrics
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { value: 'roi', label: 'ROI' },
          { value: 'win_rate', label: 'Win Rate' },
          { value: 'followers', label: 'Followers' },
          { value: 'all', label: 'Overall' },
        ].map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setFilter(option.value as any)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === option.value
                ? 'btn-grad'
                : 'bg-white/5 border border-slate-700 text-slatex-300 hover:bg-white/10'
            }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Rankings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-16 bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      ) : rankings.length === 0 ? (
        <div className="card p-8 text-center">
          <Trophy size={48} className="text-slatex-500 mx-auto mb-4" />
          <p className="text-slatex-400">No analysts found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rankings.map((ranking, index) => (
            <ScrollReveal key={ranking.user.id} delay={index * 0.05}>
              <Link href={`/profile/${ranking.user.id}`}>
                <motion.div
                  className={`card card-hover p-5 ${
                    ranking.rank <= 3 ? 'border-amber/50 shadow-ember-sm' : ''
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`flex-shrink-0 w-12 flex items-center justify-center ${getRankColor(ranking.rank)}`}>
                      {getRankIcon(ranking.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ember to-amber flex-shrink-0" />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">
                          {ranking.user.name || ranking.user.email}
                        </h3>
                        {ranking.rank <= 3 && (
                          <Award size={16} className="text-amber flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slatex-400">
                        <div className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          <span>ROI: {ranking.roi > 0 ? '+' : ''}{ranking.roi.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy size={12} />
                          <span>Win Rate: {ranking.win_rate.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          <span>{ranking.followers_count.toLocaleString()} followers</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-sm font-semibold text-amber">
                        {ranking.trust_score.toFixed(0)}
                      </div>
                      <div className="text-xs text-slatex-500">Trust Score</div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
