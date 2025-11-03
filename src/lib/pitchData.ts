// Seeded mock data generator for investor pitch dashboard

type Scenario = 'conservative' | 'baseline' | 'optimistic' | 'viral';

interface ScenarioConfig {
  mrrBase: number;
  mrrGrowth: number;
  wauBase: number;
  conversionRate: number;
  organicPercent: number;
  referralPercent: number;
  paidPercent: number;
  partnershipsPercent: number;
  viralityFactor: number;
}

const SCENARIOS: Record<Scenario, ScenarioConfig> = {
  conservative: {
    mrrBase: 2500,
    mrrGrowth: 0.03,
    wauBase: 1500,
    conversionRate: 0.04,
    organicPercent: 50,
    referralPercent: 25,
    paidPercent: 20,
    partnershipsPercent: 5,
    viralityFactor: 0.2,
  },
  baseline: {
    mrrBase: 5000,
    mrrGrowth: 0.05,
    wauBase: 3000,
    conversionRate: 0.08,
    organicPercent: 45,
    referralPercent: 30,
    paidPercent: 20,
    partnershipsPercent: 5,
    viralityFactor: 0.5,
  },
  optimistic: {
    mrrBase: 10000,
    mrrGrowth: 0.08,
    wauBase: 6000,
    conversionRate: 0.12,
    organicPercent: 40,
    referralPercent: 30,
    paidPercent: 25,
    partnershipsPercent: 5,
    viralityFactor: 1.0,
  },
  viral: {
    mrrBase: 25000,
    mrrGrowth: 0.12,
    wauBase: 15000,
    conversionRate: 0.20,
    organicPercent: 50,
    referralPercent: 35,
    paidPercent: 10,
    partnershipsPercent: 5,
    viralityFactor: 2.5,
  },
};

// Seeded PRNG
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 1103515245 + 12345) % 2147483648;
    return (this.seed >>> 0) / 2147483648;
  }

  reset(seed: number) {
    this.seed = seed;
  }
}

// Global seeded random instance
let rng: SeededRandom;

export function generatePitchData(scenario: Scenario, customSeed?: number): any {
  const seed = customSeed || getSeedForScenario(scenario);
  rng = new SeededRandom(seed);
  const config = SCENARIOS[scenario];

  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
  const daysBack = Math.floor((now.getTime() - twelveMonthsAgo.getTime()) / (1000 * 60 * 60 * 24));

  // Generate revenue timeline
  const revenueData = generateRevenueTimeline(daysBack, config);

  // Generate user metrics
  const userData = generateUserMetrics(daysBack, config);

  // Generate signup channels
  const signupsData = generateSignupChannels(config);

  // Generate funnel conversion
  const funnelData = generateFunnelConversion(config);

  // Generate revenue mix
  const revenueMixData = generateRevenueMix(revenueData);

  // Generate analyst leaderboard
  const leaderboardData = generateLeaderboard(config);

  // Calculate KPIs
  const latestRevenue = revenueData[revenueData.length - 1];
  const latestUsers = userData[userData.length - 1];
  const totalSubscriptions = revenueMixData.subscriptions;
  const avgRevenuePerUser = totalSubscriptions / latestUsers.wau;

  const kpis = {
    mrr: latestRevenue.revenue,
    wau: latestUsers.wau,
    signups7d: latestUsers.signups,
    conversionRate: config.conversionRate * 100,
    arpu: avgRevenuePerUser,
    activeSubscribers: totalSubscriptions,
  };

  return {
    kpis,
    revenueData,
    userData,
    signupsData,
    funnelData,
    revenueMixData,
    leaderboardData,
  };
}

function getSeedForScenario(scenario: Scenario): number {
  const seeds = {
    conservative: 12345,
    baseline: 54321,
    optimistic: 99999,
    viral: 77777,
  };
  return seeds[scenario];
}

function generateRevenueTimeline(days: number, config: ScenarioConfig): Array<{ date: string; revenue: number }> {
  const data: Array<{ date: string; revenue: number }> = [];
  let currentRevenue = config.mrrBase / 30; // Daily revenue

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const dateStr = date.toISOString().split('T')[0];

    // Apply growth with some variance
    const growthFactor = config.mrrGrowth / 30 + (rng.next() - 0.5) * 0.002;
    
    // Add occasional spikes for viral scenario
    if (config.viralityFactor > 1 && rng.next() < 0.05) {
      currentRevenue *= (1 + growthFactor * config.viralityFactor * 3);
    } else {
      currentRevenue *= (1 + growthFactor);
    }

    data.push({
      date: dateStr,
      revenue: Math.round(currentRevenue * 30 * 100) / 100, // Monthly revenue
    });
  }

  return data;
}

function generateUserMetrics(days: number, config: ScenarioConfig): Array<{ date: string; wau: number; signups: number }> {
  const data: Array<{ date: string; wau: number; signups: number }> = [];
  let currentWAU = config.wauBase;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const dateStr = date.toISOString().split('T')[0];

    const dailySignups = Math.floor(currentWAU * config.conversionRate * 0.01 * (1 + (rng.next() - 0.5) * 0.3));
    currentWAU += dailySignups * (0.5 + config.viralityFactor * 0.5);

    data.push({
      date: dateStr,
      wau: Math.floor(currentWAU),
      signups: dailySignups,
    });
  }

  return data;
}

function generateSignupChannels(config: ScenarioConfig): Array<{ channel: string; count: number }> {
  const total = config.wauBase * config.conversionRate * 7;
  
  return [
    { channel: 'Organic', count: Math.floor(total * (config.organicPercent / 100)) },
    { channel: 'Referral', count: Math.floor(total * (config.referralPercent / 100)) },
    { channel: 'Paid', count: Math.floor(total * (config.paidPercent / 100)) },
    { channel: 'Partnerships', count: Math.floor(total * (config.partnershipsPercent / 100)) },
  ];
}

function generateFunnelConversion(config: ScenarioConfig): Array<{ stage: string; count: number; percentage: number }> {
  const visitors = 10000;
  const signups = visitors * config.conversionRate;
  const trials = signups * 0.8;
  const paying = trials * 0.6;

  return [
    { stage: 'Visitors', count: visitors, percentage: 100 },
    { stage: 'Signups', count: Math.floor(signups), percentage: config.conversionRate * 100 },
    { stage: 'Trials', count: Math.floor(trials), percentage: (trials / visitors) * 100 },
    { stage: 'Paying', count: Math.floor(paying), percentage: (paying / visitors) * 100 },
  ];
}

function generateRevenueMix(revenueData: any[]): { subscriptions: number; payPerAnalysis: number; tips: number } {
  const latestRevenue = revenueData[revenueData.length - 1].revenue;
  
  return {
    subscriptions: Math.floor(latestRevenue * 0.70),
    payPerAnalysis: Math.floor(latestRevenue * 0.20),
    tips: Math.floor(latestRevenue * 0.10),
  };
}

function generateLeaderboard(config: ScenarioConfig): Array<{ name: string; roi: number; winRate: number; followers: number; sparkline: number[] }> {
  const analysts: Array<{ name: string; roi: number; winRate: number; followers: number; sparkline: number[] }> = [];
  
  // Generate 200 analysts and pick top 10 by ROI
  for (let i = 0; i < 200; i++) {
    const roi = Math.max(0, 12 + (rng.next() - 0.5) * 16);
    const winRate = Math.min(100, 50 + rng.next() * 30);
    
    // Pareto distribution for followers
    let followers: number;
    if (rng.next() < 0.05) {
      followers = 5000 + Math.floor(rng.next() * 15000);
    } else if (rng.next() < 0.20) {
      followers = 1000 + Math.floor(rng.next() * 4000);
    } else {
      followers = 100 + Math.floor(rng.next() * 900);
    }

    // Generate 30-day sparkline
    const sparkline: number[] = [];
    let baseValue = roi;
    for (let j = 0; j < 30; j++) {
      baseValue += (rng.next() - 0.5) * 4;
      sparkline.push(Math.max(0, Math.round(baseValue * 10) / 10));
    }

    analysts.push({ name: `Analyst_${i + 1}`, roi, winRate, followers, sparkline });
  }

  return analysts.sort((a, b) => b.roi - a.roi).slice(0, 10);
}

// Function to simulate real-time updates
export function simulateUpdates(
  currentData: any,
  duration: number,
  onUpdate: (data: any) => void
): NodeJS.Timeout {
  const interval = setInterval(() => {
    const newData = { ...currentData };
    
    // Increment MRR slightly
    newData.kpis.mrr += rng.next() * 50;
    
    // Increment signups occasionally
    if (rng.next() < 0.3) {
      newData.kpis.signups7d += 1;
    }

    onUpdate(newData);
  }, 1000);

  return interval;
}
