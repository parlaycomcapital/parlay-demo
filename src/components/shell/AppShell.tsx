'use client';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 px-5 lg:pl-[calc(var(--sidebar-width)+var(--gutter))] py-6 flex justify-center">
          <div className="w-full max-w-[var(--content-width)]">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

