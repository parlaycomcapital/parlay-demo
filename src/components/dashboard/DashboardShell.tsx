'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, PenTool, DollarSign, Settings } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: LayoutDashboard, active: true },
    { id: 'composer', label: 'Composer', icon: PenTool, badge: 'Soon' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, badge: 'Soon' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: 'Soon' },
  ];

  return (
    <div className="min-h-screen bg-navy relative">
      {/* Ambient background gradients */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(230, 62, 48, 0.12), transparent 60%),
            radial-gradient(circle at 85% 75%, rgba(245, 166, 35, 0.08), transparent 60%)
          `,
        }}
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="hidden lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:flex lg:w-[280px] lg:flex-col border-r border-white/[0.08]"
        style={{
          background: 'rgba(10, 15, 30, 0.95)',
          backdropFilter: 'blur(32px) saturate(180%)',
        }}
      >
        {/* Logo Section */}
        <div className="p-8 border-b border-white/[0.08]">
          <Logo variant="sidebar" />
          <p className="text-[10px] text-white/40 font-medium tracking-[0.2em] mt-3">
            CREATOR STUDIO
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <motion.button
                key={item.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                disabled={!isActive}
                className={`
                  w-full flex items-center gap-3 px-4 h-[56px] rounded-xl font-medium text-[15px]
                  transition-all duration-300 group relative
                  ${isActive 
                    ? 'text-white font-semibold' 
                    : 'text-white/50 hover:text-white/90 hover:bg-white/[0.03] cursor-not-allowed'
                  }
                `}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(230,62,48,0.15) 0%, rgba(245,166,35,0.15) 100%)',
                  borderLeft: '4px solid #F5A623',
                  boxShadow: '0 0 24px rgba(230,62,48,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                } : {}}
              >
                <Icon className={`w-[22px] h-[22px] ${isActive ? 'text-amber' : ''}`} />
                <span className="flex-1 text-left tracking-wide">{item.label}</span>
                
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/[0.08]">
          <div className="text-xs text-white/40 space-y-1">
            <p className="font-medium text-white/60">Dashboard Alpha</p>
            <p>Investor Preview Build</p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="lg:pl-[280px] relative z-10">
        {/* Sticky Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-0 z-50 border-b border-white/[0.08]"
          style={{
            background: 'rgba(11,19,43,0.8)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <div className="px-10 py-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-poppins font-bold text-white tracking-tight">
                Analytics
              </h1>
              <p className="text-lg text-white/60 mt-2">
                Track your performance and grow your audience
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
            >
              Export Report
            </motion.button>
          </div>
        </motion.header>

        {/* Content Area */}
        <div className="px-10 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

