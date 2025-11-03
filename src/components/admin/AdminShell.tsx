'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Flag,
  UserCheck,
  Users,
  FileText,
  LogOut,
} from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/lib/supabaseClient';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
  { href: '/admin/verify', label: 'Verify', icon: UserCheck },
  { href: '/admin/groups', label: 'Groups', icon: Users },
  { href: '/admin/logs', label: 'Audit Logs', icon: FileText },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useSupabaseAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-navy">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-card/70 backdrop-blur-lg border-r border-slate-800/60 transition-all duration-300 flex-shrink-0`}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo/Brand */}
          <div className="mb-8 px-2">
            <h1 className="text-xl font-poppins font-bold text-white">Admin</h1>
            <p className="text-xs text-textSecondary">Dashboard</p>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-ember/20 to-amber/20 border-l-2 border-amber text-white'
                        : 'text-textSecondary hover:text-white hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="pt-4 border-t border-slate-800/60">
            {user && (
              <div className="px-2 mb-3">
                <p className="text-xs text-textSecondary mb-1">Signed in as</p>
                <p className="text-sm text-white truncate">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-textSecondary hover:text-white hover:bg-slate-800/30 transition-colors"
            >
              <LogOut size={18} />
              {isSidebarOpen && <span className="text-sm">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

