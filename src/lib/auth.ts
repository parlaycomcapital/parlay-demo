import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthConfig = {
  providers: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ] : [],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.role = 'fan'; // Default role for development
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // Use JWT for development
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
};
