import type { Metadata } from 'next';
import '@/styles/globals.css';
import AppShell from '@/components/shell/AppShell';
import { SessionProvider } from '@/components/auth/SessionProvider';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SessionProvider>
            <AppShell>{children}</AppShell>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}