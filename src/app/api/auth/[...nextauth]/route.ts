import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// NextAuth 5 exports handler as an object with GET and POST
export const { GET, POST } = handler as any;
