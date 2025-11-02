import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';
import { isPlaceholderMode, mockUsers } from './mockData';

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Use mock authentication in placeholder mode
        if (isPlaceholderMode()) {
          console.log('Placeholder mode: Authentication attempt', credentials.email);
          // Accept any password in placeholder mode
          const mockUser = mockUsers.find(u => u.email === credentials.email);
          if (mockUser) {
            return {
              id: mockUser.id,
              email: mockUser.email,
              role: mockUser.role,
              name: mockUser.name || mockUser.email,
            };
          }
          // Default demo user based on email
          const emailStr = credentials.email as string;
          if (emailStr.includes('creator') || emailStr.includes('demo')) {
            return {
              id: 'user1',
              email: 'demo@parlay.app',
              role: 'creator' as const,
              name: 'Demo Creator',
            };
          }
          return {
            id: 'user2',
            email: 'follower@parlay.app',
            role: 'follower' as const,
            name: 'Demo Follower',
          };
        }

        try {
          // Fetch user from Supabase
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (error || !user) {
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) {
            return null;
          }

          // Return user object (password excluded)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name || user.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
            async session({ session, token }) {
              if (token?.sub) {
                session.user.id = token.sub;
                session.user.role = token.role as 'creator' | 'follower' | 'admin';
                session.user.email = token.email as string;
              }
              return session;
            },
            async jwt({ token, user }) {
              if (user) {
                token.sub = user.id;
                token.role = user.role as 'creator' | 'follower' | 'admin';
                token.email = user.email || undefined;
              }
              return token;
            },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
};