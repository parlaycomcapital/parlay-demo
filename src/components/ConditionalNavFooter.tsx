'use client';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import Footer from './Footer';

const pagesWithAppShell = ['/feed', '/dashboard', '/profile', '/settings', '/admin'];

export default function ConditionalNavFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useAppShell = pagesWithAppShell.some(page => pathname.startsWith(page));

  if (useAppShell) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

