'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import CountdownTimer from './CountdownTimer';
import { Lock, Mail, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'Moneymachine69';

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    // Check if already unlocked
    const unlocked = sessionStorage.getItem('parlay_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setError('');
      setIsUnlocked(true);
      sessionStorage.setItem('parlay_unlocked', 'true');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Save email to database
    console.log('Waitlist email:', email);
    
    // Show success
    alert(`✅ You're on the list! We'll notify ${email} when we launch.`);
    setEmail('');
    setShowWaitlist(false);
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))',
          }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
            <Logo variant="hero" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Something Big
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Is Coming
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
            The future of sports intelligence. Get ready for the platform that will change how you analyze sports forever.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <span className="text-white/80 text-sm uppercase tracking-wider font-semibold">
              Launching in
            </span>
          </div>
          <CountdownTimer />
        </motion.div>

        {/* Waitlist Form */}
        <AnimatePresence mode="wait">
          {!showWaitlist ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <motion.button
                onClick={() => setShowWaitlist(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-2xl flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Join Waitlist
              </motion.button>
              <motion.button
                onClick={() => {
                  const modal = document.getElementById('password-modal');
                  if (modal) modal.style.display = 'block';
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Enter Password
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="waitlist"
              onSubmit={handleWaitlistSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-xl"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
              <button
                type="button"
                onClick={() => setShowWaitlist(false)}
                className="mt-4 text-white/70 hover:text-white text-sm underline"
              >
                Cancel
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white shadow-md"
                />
              ))}
            </div>
            <span className="text-white/90 text-sm font-medium">
              <strong>347 people</strong> on the waitlist
            </span>
          </div>
        </motion.div>
      </div>

      {/* Password Modal */}
      <div
        id="password-modal"
        style={{ display: 'none' }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            (e.target as HTMLElement).style.display = 'none';
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Private Preview
            </h3>
            <p className="text-gray-600">
              Enter the password to access Parlay
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
              autoFocus
            />
            
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Unlock Preview
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Don't have access? <button onClick={() => { setShowWaitlist(true); (document.getElementById('password-modal') as HTMLElement).style.display = 'none'; }} className="text-blue-600 hover:underline">Join waitlist</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

