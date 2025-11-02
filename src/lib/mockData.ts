// Mock data for placeholder mode development
export const PLACEHOLDER_MODE = process.env.PLACEHOLDER_MODE === 'true';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'creator' | 'follower';
  avatar_url?: string;
  roi?: number;
  win_rate?: number;
  followers_count?: number;
}

export interface MockPost {
  id: string;
  title: string;
  sport: string;
  content: string;
  price: number;
  author_id: string;
  group_id?: string;
  is_premium: boolean;
  requires_subscription?: boolean;
  likes_count: number;
  comments_count: number;
  image_url?: string;
  created_at: string;
}

export interface MockGroup {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  avatar_url?: string;
  member_count: number;
  is_public: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user1',
    email: 'demo@parlay.app',
    name: 'Demo Creator',
    role: 'creator',
    avatar_url: '/assets/placeholders/avatar.png',
    roi: 12.3,
    win_rate: 68.5,
    followers_count: 1248,
  },
  {
    id: 'user2',
    email: 'follower@parlay.app',
    name: 'Demo Follower',
    role: 'follower',
    avatar_url: '/assets/placeholders/avatar.png',
    followers_count: 342,
  },
  {
    id: 'user3',
    email: 'analyst@parlay.app',
    name: 'Sports Analyst',
    role: 'creator',
    avatar_url: '/assets/placeholders/avatar.png',
    roi: 18.7,
    win_rate: 72.1,
    followers_count: 2156,
  },
];

export const mockPosts: MockPost[] = [
  {
    id: 'post1',
    title: 'Manchester United vs Arsenal: Premier League Analysis',
    sport: 'Football',
    content:
      'Comprehensive analysis of the Manchester United vs Arsenal Premier League clash. Key insights on team form, tactics, and predictions. This is a detailed breakdown of recent performances, head-to-head statistics, and injury reports.',
    price: 0,
    author_id: 'user1',
    is_premium: false,
    requires_subscription: false,
    likes_count: 24,
    comments_count: 8,
    image_url: '/assets/placeholders/post-image.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 'post2',
    title: 'Djokovic vs Nadal: French Open Semifinal Preview',
    sport: 'Tennis',
    content:
      'Expert breakdown of the Djokovic vs Nadal French Open semifinal. Surface analysis and tactical insights. Premium content includes detailed statistics, head-to-head records, and match predictions based on current form.',
    price: 12.99,
    author_id: 'user3',
    is_premium: true,
    requires_subscription: true,
    likes_count: 45,
    comments_count: 12,
    image_url: '/assets/placeholders/post-image.png',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'post3',
    title: 'Lakers vs Warriors: NBA Playoff Analysis',
    sport: 'Basketball',
    content:
      'Detailed analysis of the Lakers vs Warriors playoff series. Key matchups and strategic insights. This analysis covers recent form, player statistics, and tactical breakdowns for both teams.',
    price: 18.99,
    author_id: 'user1',
    is_premium: true,
    requires_subscription: false,
    likes_count: 67,
    comments_count: 15,
    image_url: '/assets/placeholders/post-image.png',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'post4',
    title: 'Chelsea vs Liverpool: Match Preview',
    sport: 'Football',
    content:
      'Placeholder content for Chelsea vs Liverpool match preview. This post demonstrates the layout and styling of a standard feed post with full content visible.',
    price: 0,
    author_id: 'user2',
    is_premium: false,
    requires_subscription: false,
    likes_count: 12,
    comments_count: 4,
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const mockGroups: MockGroup[] = [
  {
    id: 'group1',
    creator_id: 'user1',
    name: 'Premier League Insights',
    description: 'Expert analysis and predictions for Premier League matches',
    avatar_url: '/assets/placeholders/group-avatar.png',
    member_count: 342,
    is_public: true,
  },
  {
    id: 'group2',
    creator_id: 'user3',
    name: 'Tennis Experts',
    description: 'In-depth tennis analysis and tournament predictions',
    avatar_url: '/assets/placeholders/group-avatar.png',
    member_count: 189,
    is_public: true,
  },
];

export const mockSubscription = {
  id: 'sub1',
  user_id: 'user1',
  tier: 'pro' as const,
  status: 'active' as const,
  current_period_start: new Date().toISOString(),
  current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

// Helper function to check if placeholder mode is enabled
export function isPlaceholderMode(): boolean {
  return PLACEHOLDER_MODE || 
         process.env.NEXT_PUBLIC_SUPABASE_URL === 'placeholder' ||
         !process.env.NEXT_PUBLIC_SUPABASE_URL ||
         process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co';
}

// Placeholder image URL
export const PLACEHOLDER_IMAGE = '/assets/placeholders/placeholder.png';
export const PLACEHOLDER_AVATAR = '/assets/placeholders/avatar.png';
export const PLACEHOLDER_POST_IMAGE = '/assets/placeholders/post-image.png';
export const PLACEHOLDER_GROUP_AVATAR = '/assets/placeholders/group-avatar.png';
