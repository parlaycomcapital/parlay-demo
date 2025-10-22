export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isAnalyst: boolean;
  isAdmin: boolean;
  joinDate: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  preview: string;
  authorId: string;
  author: User;
  sport: string;
  teams: string[];
  price: number;
  isPremium: boolean;
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "alex_sports",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Professional sports analyst with 10+ years experience in football and basketball.",
    followers: 12500,
    following: 450,
    isAnalyst: true,
    isAdmin: false,
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "sarah_tennis",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Tennis expert and former college player. Specializing in ATP/WTA analysis.",
    followers: 8900,
    following: 320,
    isAnalyst: true,
    isAdmin: false,
    joinDate: "2023-03-22"
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    username: "mike_hockey",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "NHL analyst and hockey enthusiast. Covering all major leagues.",
    followers: 15600,
    following: 280,
    isAnalyst: true,
    isAdmin: false,
    joinDate: "2022-11-08"
  },
  {
    id: "4",
    name: "Emma Wilson",
    username: "emma_fan",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Sports fan and casual bettor. Love following expert analysis.",
    followers: 1200,
    following: 890,
    isAnalyst: false,
    isAdmin: false,
    joinDate: "2023-06-10"
  },
  {
    id: "5",
    name: "Admin User",
    username: "admin",
    email: "admin@parlay.sk",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    bio: "Platform administrator",
    followers: 0,
    following: 0,
    isAnalyst: false,
    isAdmin: true,
    joinDate: "2022-01-01"
  }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Manchester United vs Arsenal: Premier League Analysis",
    content: "Full analysis of the upcoming Manchester United vs Arsenal match. Key factors include team form, head-to-head records, injury reports, and tactical analysis. Manchester United has been struggling defensively while Arsenal's attack has been firing on all cylinders. Weather conditions and referee tendencies will also play a crucial role in this high-stakes encounter.",
    preview: "Comprehensive analysis of the Manchester United vs Arsenal Premier League clash. Key insights on team form, tactics, and predictions.",
    authorId: "1",
    author: mockUsers[0],
    sport: "Football",
    teams: ["Manchester United", "Arsenal"],
    price: 15.99,
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    createdAt: "2024-01-15T10:30:00Z",
    likes: 45,
    comments: 12,
    views: 320
  },
  {
    id: "2",
    title: "Djokovic vs Nadal: French Open Semifinal Preview",
    content: "In-depth analysis of the Djokovic vs Nadal semifinal at Roland Garros. Both players have shown exceptional form this tournament. Nadal's clay court dominance vs Djokovic's all-court game. Surface conditions, recent head-to-head, and mental factors will determine the outcome.",
    preview: "Expert breakdown of the Djokovic vs Nadal French Open semifinal. Surface analysis and tactical insights.",
    authorId: "2",
    author: mockUsers[1],
    sport: "Tennis",
    teams: ["Djokovic", "Nadal"],
    price: 0,
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    createdAt: "2024-01-14T14:20:00Z",
    likes: 78,
    comments: 23,
    views: 450
  },
  {
    id: "3",
    title: "Lakers vs Warriors: NBA Playoff Analysis",
    content: "Complete breakdown of the Lakers vs Warriors playoff series. Key matchups, coaching strategies, and player performances. LeBron's leadership vs Curry's shooting. Defensive schemes and offensive adjustments will be crucial in this Western Conference battle.",
    preview: "Detailed analysis of the Lakers vs Warriors playoff series. Key matchups and strategic insights.",
    authorId: "1",
    author: mockUsers[0],
    sport: "Basketball",
    teams: ["Lakers", "Warriors"],
    price: 12.99,
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    createdAt: "2024-01-13T16:45:00Z",
    likes: 92,
    comments: 18,
    views: 580
  },
  {
    id: "4",
    title: "Maple Leafs vs Bruins: NHL Rivalry Renewed",
    content: "Analysis of the historic Maple Leafs vs Bruins rivalry. Recent form, key players, and playoff implications. Toronto's offensive firepower vs Boston's defensive structure. Special teams and goaltending will be the deciding factors.",
    preview: "Historic rivalry analysis: Maple Leafs vs Bruins. Key factors and playoff implications.",
    authorId: "3",
    author: mockUsers[2],
    sport: "Hockey",
    teams: ["Maple Leafs", "Bruins"],
    price: 0,
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    createdAt: "2024-01-12T11:15:00Z",
    likes: 34,
    comments: 8,
    views: 210
  },
  {
    id: "5",
    title: "Real Madrid vs Barcelona: El Clásico Breakdown",
    content: "Comprehensive analysis of the most anticipated match in world football. Tactical formations, key battles, and historical context. Both teams have new signings that could impact the outcome. Home advantage and crowd support will play significant roles.",
    preview: "El Clásico analysis: Real Madrid vs Barcelona. Tactical breakdown and key insights.",
    authorId: "1",
    author: mockUsers[0],
    sport: "Football",
    teams: ["Real Madrid", "Barcelona"],
    price: 19.99,
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    createdAt: "2024-01-11T09:30:00Z",
    likes: 156,
    comments: 42,
    views: 890
  },
  {
    id: "6",
    title: "Federer vs Murray: Wimbledon Classic Preview",
    content: "Analysis of the Federer vs Murray Wimbledon encounter. Grass court specialists going head-to-head. Serve and volley tactics vs baseline consistency. Experience vs youth in this classic matchup.",
    preview: "Wimbledon classic: Federer vs Murray analysis. Grass court tactics and predictions.",
    authorId: "2",
    author: mockUsers[1],
    sport: "Tennis",
    teams: ["Federer", "Murray"],
    price: 8.99,
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    createdAt: "2024-01-10T13:20:00Z",
    likes: 67,
    comments: 15,
    views: 340
  },
  {
    id: "7",
    title: "Celtics vs Heat: Eastern Conference Finals",
    content: "In-depth analysis of the Celtics vs Heat Eastern Conference Finals. Coaching strategies, player matchups, and home court advantage. Tatum's scoring vs Butler's leadership. Defensive intensity and clutch performances will determine the series.",
    preview: "Eastern Conference Finals: Celtics vs Heat. Coaching strategies and key matchups.",
    authorId: "1",
    author: mockUsers[0],
    sport: "Basketball",
    teams: ["Celtics", "Heat"],
    price: 0,
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    createdAt: "2024-01-09T15:10:00Z",
    likes: 43,
    comments: 11,
    views: 280
  },
  {
    id: "8",
    title: "Oilers vs Flames: Battle of Alberta",
    content: "Analysis of the intense Oilers vs Flames rivalry. McDavid's speed vs Gaudreau's skill. Goaltending battles and special teams will be crucial. Home ice advantage and crowd energy will impact the outcome.",
    preview: "Battle of Alberta: Oilers vs Flames. Rivalry analysis and key factors.",
    authorId: "3",
    author: mockUsers[2],
    sport: "Hockey",
    teams: ["Oilers", "Flames"],
    price: 14.99,
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    createdAt: "2024-01-08T12:45:00Z",
    likes: 29,
    comments: 7,
    views: 190
  }
];

export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

export const getPostsByAuthor = (authorId: string): Post[] => {
  return mockPosts.filter(post => post.authorId === authorId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getAnalysts = (): User[] => {
  return mockUsers.filter(user => user.isAnalyst);
};

export const getFreePosts = (): Post[] => {
  return mockPosts.filter(post => !post.isPremium);
};

export const getPremiumPosts = (): Post[] => {
  return mockPosts.filter(post => post.isPremium);
};


