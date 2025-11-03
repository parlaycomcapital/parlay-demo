'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { isPlaceholderMode } from '@/lib/mockData';
import { supabase } from '@/lib/supabaseClient';

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateGroupModal({ open, onClose, onSuccess }: CreateGroupModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setLoading(true);
    setError('');

    // Placeholder mode: create mock group
    if (isPlaceholderMode()) {
      console.log('Placeholder mode: Group created', formData);
      setTimeout(() => {
        setFormData({ name: '', description: '', is_public: true });
        onSuccess();
        onClose();
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('groups')
        .insert({
          creator_id: session.user.id,
          name: formData.name,
          description: formData.description,
          is_public: formData.is_public,
          member_count: 0,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Add creator as admin member
      await supabase.from('group_members').insert({
        group_id: data.id,
        user_id: session.user.id,
        role: 'admin',
      });

      setFormData({ name: '', description: '', is_public: true });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create group');
      console.error('Error creating group:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 lg:p-6"
          >
            <div className="card p-6 lg:p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 icon-btn"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Create Community</h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Community Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input"
                    placeholder="e.g., Premier League Experts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="input resize-none"
                    placeholder="What is this community about?"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_public"
                    checked={formData.is_public}
                    onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                    className="w-4 h-4 text-amber bg-card border-slate-600 rounded focus:ring-amber focus:ring-2"
                  />
                  <label htmlFor="is_public" className="text-sm text-slatex-300">
                    Make this community public
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-700 text-slatex-300 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={loading || !formData.name.trim()}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-grad disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Community'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
