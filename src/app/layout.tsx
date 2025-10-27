import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { SessionProvider } from '@/components/auth/SessionProvider';
import Providers from '@/components/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Parlay — Smart Sports. Smarter Minds.',
  description: 'Join the Parlay community where insight meets adrenaline.',
  openGraph: {
    title: 'Parlay — Smart Sports. Smarter Minds.',
    description: 'Join the Parlay community where insight meets adrenaline.',
    images: ['/assets/brand/hero-banner.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parlay — Smart Sports. Smarter Minds.',
    description: 'Join the Parlay community where insight meets adrenaline.',
    images: ['/assets/brand/hero-banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-body antialiased transition-colors duration-500 bg-background text-foreground`}
      >
        <Providers>
          <SessionProvider>
            <NavBar />
            <main className="min-h-screen">
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </main>
            <Footer />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
