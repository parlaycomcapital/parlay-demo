import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    role: 'creator' | 'follower';
    name?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: 'creator' | 'follower';
      name?: string;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'creator' | 'follower';
    email: string;
  }
}