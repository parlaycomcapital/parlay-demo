'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-slate-300">
        <div className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline text-sm">Theme</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors duration-200 group"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="group-hover:scale-110 transition-transform duration-200"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
      <span className="hidden sm:inline text-sm font-medium">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
