import type { Metadata } from 'next';
import '@/styles/globals.css';
import ConditionalAppShell from '@/components/shell/ConditionalAppShell';
import { SessionProvider } from '@/components/auth/SessionProvider';
import Providers from '@/components/Providers';
import SkipToContent from '@/components/ui/SkipToContent';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://parlay-demo.vercel.app'),
  title: 'Parlay — Smart Sports. Smarter Minds.',
  description: 'Join the Parlay community where insight meets adrenaline.',
  openGraph: {
    title: 'Parlay — Smart Sports. Smarter Minds.',
    description: 'Join the Parlay community where insight meets adrenaline.',
    images: ['/assets/brand/optimized/logo-solid@2x.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parlay — Smart Sports. Smarter Minds.',
    description: 'Join the Parlay community where insight meets adrenaline.',
    images: ['/assets/brand/optimized/logo-solid@2x.webp'],
  },
  themeColor: '#0B132B',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero logo for faster LCP */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/brand/optimized/logo-transparent@2x.webp" 
          type="image/webp"
          imageSizes="(max-width: 768px) 96px, (max-width: 1280px) 112px, 120px"
        />
        {/* Preload navbar logo */}
        <link 
          rel="preload" 
          as="image" 
          href="/assets/brand/optimized/logo-solid@2x.webp" 
          type="image/webp"
          imageSizes="(max-width: 768px) 32px, 56px"
        />
      </head>
      <body className="font-sans">
        <SkipToContent />
        <Providers>
          <SessionProvider>
            <ConditionalAppShell>{children}</ConditionalAppShell>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}