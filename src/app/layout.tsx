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
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parlay — Smart Sports. Smarter Minds.',
    description: 'Join the Parlay community where insight meets adrenaline.',
    images: ['/logo.png'],
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