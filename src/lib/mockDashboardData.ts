// Mock analytics data generator for investor demos

export interface AnalyticsData {
  totalViews: number;
  viewsChange: number;
  engagementRate: number;
  engagementChange: number;
  winRate: number;
  winRateChange: number;
  followers: number;
  followersChange: number;
  performanceTimeline: Array<{
    date: string;
    views: number;
    likes: number;
    engagement: number;
  }>;
  sportBreakdown: Array<{
    sport: string;
    winRate: number;
    totalPosts: number;
    color: string;
  }>;
}

export function generateMockAnalytics(timeRange: '7d' | '30d' | '90d' | 'all'): AnalyticsData {
  const multipliers = {
    '7d': 1,
    '30d': 4,
    '90d': 12,
    'all': 80,
  };

  const mult = multipliers[timeRange];

  // Generate performance timeline
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 180;
  const timeline = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add slight upward trend
    const trendMultiplier = 1 + (i / days) * 0.3;
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor((Math.random() * 500 + 300) * mult * trendMultiplier),
      likes: Math.floor((Math.random() * 100 + 50) * mult * trendMultiplier),
      engagement: Math.floor(Math.random() * 15 + 5),
    };
  });

  return {
    totalViews: timeRange === '7d' ? 11450 : timeRange === '30d' ? 45800 : timeRange === '90d' ? 137400 : 916000,
    viewsChange: 12.5,
    engagementRate: 8.4,
    engagementChange: 5.2,
    winRate: 67.3,
    winRateChange: 3.1,
    followers: timeRange === '7d' ? 308 : timeRange === '30d' ? 1234 : timeRange === '90d' ? 3702 : 24680,
    followersChange: 8.7,
    performanceTimeline: timeline,
    sportBreakdown: [
      { sport: 'NFL', winRate: 72, totalPosts: 45 * mult, color: '#E63E30' },
      { sport: 'NBA', winRate: 65, totalPosts: 38 * mult, color: '#F5A623' },
      { sport: 'MLB', winRate: 58, totalPosts: 29 * mult, color: '#10B981' },
      { sport: 'NHL', winRate: 70, totalPosts: 22 * mult, color: '#3B82F6' },
      { sport: 'Soccer', winRate: 63, totalPosts: 31 * mult, color: '#8B5CF6' },
    ],
  };
}

