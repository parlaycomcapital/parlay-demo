export interface User {
  id: string;
  username: string;
  role: 'fan' | 'analyst' | 'admin';
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

export interface Purchase {
  postId: string;
  userId: string;
  purchasedAt: string;
}

// User Management
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('parlay_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('parlay_user', JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('parlay_user');
};

// Posts Management
export const getPosts = (): Post[] => {
  if (typeof window === 'undefined') return [];
  const posts = localStorage.getItem('parlay_posts');
  return posts ? JSON.parse(posts) : [];
};

export const setPosts = (posts: Post[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('parlay_posts', JSON.stringify(posts));
};

export const addPost = (post: Post): void => {
  const posts = getPosts();
  posts.unshift(post); // Add to beginning
  setPosts(posts);
};

export const updatePost = (postId: string, updates: Partial<Post>): void => {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    setPosts(posts);
  }
};

export const deletePost = (postId: string): void => {
  const posts = getPosts();
  const filtered = posts.filter((p) => p.id !== postId);
  setPosts(filtered);
};

// Purchases Management
export const getPurchases = (): Purchase[] => {
  if (typeof window === 'undefined') return [];
  const purchases = localStorage.getItem('parlay_purchases');
  return purchases ? JSON.parse(purchases) : [];
};

export const addPurchase = (purchase: Purchase): void => {
  const purchases = getPurchases();
  purchases.push(purchase);
  localStorage.setItem('parlay_purchases', JSON.stringify(purchases));
};

export const hasPurchased = (postId: string, userId: string): boolean => {
  const purchases = getPurchases();
  return purchases.some((p) => p.postId === postId && p.userId === userId);
};

export const getUserPurchases = (userId: string): string[] => {
  const purchases = getPurchases();
  return purchases.filter((p) => p.userId === userId).map((p) => p.postId);
};

// Initialize with demo data if empty
export const initializeDemoData = (): void => {
  if (typeof window === 'undefined') return;

  // Only initialize if no data exists
  if (!localStorage.getItem('parlay_posts')) {
    // Import demo data
    const { mockPosts } = require('@/data/mockData');
    setPosts(mockPosts);
  }
};

// Reset all data (for admin)
export const resetAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('parlay_user');
  localStorage.removeItem('parlay_posts');
  localStorage.removeItem('parlay_purchases');
  initializeDemoData();
};
