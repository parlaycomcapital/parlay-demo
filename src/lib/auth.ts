import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { supabase } from './supabaseClient'

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXTAUTH_SECRET!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', token.sub)
          .single()
        session.user.role = data?.role || 'fan'
      }
      return session
    },
  },
  events: {
    async signIn({ user }) {
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single()
      
      if (!existing) {
        await supabase
          .from('users')
          .insert([{
            id: user.id,
            email: user.email,
            name: user.name,
            role: 'fan',
            avatar_url: user.image,
          }])
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'database',
  },
}
