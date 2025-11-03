'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useGroups } from '@/hooks/useGroups';

export default function CreateGroupPage() {
  const { user, isAuthenticated, isCreator } = useSupabaseAuth();
  const { createGroup } = useGroups();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_private: false,
  });

  // Redirect if not authenticated or not a creator
  if (!isAuthenticated || !isCreator) {
    router.push('/groups');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Group name is required');
      setLoading(false);
      return;
    }

    try {
      const newGroup = await createGroup({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        is_private: formData.is_private,
      });

      router.push(`/groups/${newGroup.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create group. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto z-10">
        {/* Back button */}
        <Link
          href="/groups"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-amber transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Groups
        </Link>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card/70 backdrop-blur-lg border border-slate-800/60 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-poppins font-semibold text-white mb-2">
            Create a Group
          </h2>
          <p className="text-slate-400 mb-8">
            Start a community for like-minded analysts and followers.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Group Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Group Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., NBA Analytics Hub"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber/50 focus:border-amber/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="What is this group about? Share insights, analysis, and more..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber/50 focus:border-amber/50 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.is_private}
                onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                disabled={loading}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900/70 text-amber focus:ring-2 focus:ring-amber/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div>
                <span className="block text-sm font-medium text-slate-300">
                  Private Group
                </span>
                <span className="block text-xs text-slate-500">
                  Only invited members can view and join
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Creating...' : 'Create Group'}
            </motion.button>
            <Link
              href="/groups"
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </main>
  );
}

