'use client';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-6 pb-20 lg:pb-6 lg:pl-[280px] w-full">
          <div className="max-w-[720px] mx-auto px-5 lg:px-6">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}