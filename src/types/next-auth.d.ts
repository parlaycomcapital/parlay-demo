import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: 'creator' | 'follower' | 'admin';
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    role?: 'creator' | 'follower' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string;
    role?: 'creator' | 'follower' | 'admin';
    email?: string;
  }
}