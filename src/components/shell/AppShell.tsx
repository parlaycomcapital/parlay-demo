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
        <main className="flex-1 pt-6 pb-20 lg:pb-6 px-5 lg:px-6 lg:pl-[280px]">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}