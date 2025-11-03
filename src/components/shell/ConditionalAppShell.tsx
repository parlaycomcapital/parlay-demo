'use client';

import { usePathname } from 'next/navigation';
import AppShell from './AppShell';
import Topbar from './Topbar';

const NO_SHELL_PAGES = ['/', '/login', '/register', '/forgot-password', '/terms', '/privacy', '/responsible-use', '/landing'];

export default function ConditionalAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldUseAppShell = !NO_SHELL_PAGES.includes(pathname);

  if (!shouldUseAppShell) {
    return (
      <div className="min-h-screen bg-navy">
        <Topbar />
        {children}
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}