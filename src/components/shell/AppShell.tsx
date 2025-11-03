'use client';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 pt-6 pb-20 md:pb-6 lg:pb-6 md:pl-[88px] lg:pl-[280px] w-full min-h-[calc(100vh-72px)]">
          <div className="max-w-[720px] mx-auto px-5">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}