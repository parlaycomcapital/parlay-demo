'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const pagesWithSidebar = ['/feed', '/dashboard', '/profile', '/settings', '/admin'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pagesWithSidebar.some(page => pathname.startsWith(page));

  if (showSidebar) {
    return (
      <div className="flex">
        <Sidebar />
        <MobileNav />
        <div className="flex-1 ml-0 md:ml-64">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
