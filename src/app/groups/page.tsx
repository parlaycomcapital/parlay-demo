'use client';

import { useGroups } from '@/hooks/useGroups';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Users, Lock, Globe, Sparkles } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function GroupsPage() {
  const { groups, loading } = useGroups();
  const { user, profile, isAuthenticated, isCreator } = useSupabaseAuth();
  const router = useRouter();

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 md:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-20">
            <Logo variant="hero" className="mx-auto mb-6 opacity-50" />
            <p className="text-slate-400 text-lg">Loading groups...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1027] via-[#0B132B] to-[#101A2E] px-4 md:px-8 py-10">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, rgba(178,66,48,0.15), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-poppins font-semibold text-white mb-2">
              Groups & Communities
            </h1>
            <p className="text-slate-400 text-lg">
              Join analyst-led communities and share insights with like-minded minds.
            </p>
          </div>
          {isAuthenticated && isCreator && (
            <motion.button
              onClick={() => router.push('/groups/create')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-ember to-amber text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              Create Group
            </motion.button>
          )}
        </motion.div>

        {/* Groups Grid */}
        {groups.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-ember/20 to-amber/20 flex items-center justify-center">
              <Users size={48} className="text-amber opacity-50" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">No groups yet</h2>
            <p className="text-slate-400 mb-6">
              {isCreator
                ? 'Be the first to create a community and start sharing insights!'
                : 'Groups created by analysts will appear here.'}
            </p>
            {isCreator && (
              <motion.button
                onClick={() => router.push('/groups/create')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-ember to-amber text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create First Group
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-card/70 backdrop-blur-lg border border-slate-800/60 hover:shadow-[0_0_28px_rgba(245,166,35,0.15)] transition-all duration-300 overflow-hidden group"
              >
                {/* Cover Image Placeholder */}
                {group.cover_url && (
                  <div
                    className="h-32 bg-gradient-to-br from-ember/30 to-amber/30"
                    style={{
                      backgroundImage: `url(${group.cover_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-amber transition-colors">
                        {group.name}
                      </h2>
                      {group.is_private ? (
                        <div className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Lock size={12} />
                          Private
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Globe size={12} />
                          Public
                        </div>
                      )}
                    </div>
                    {group.is_member && (
                      <div className="px-2 py-1 rounded-lg bg-amber/20 text-amber text-xs font-medium flex items-center gap-1">
                        <Sparkles size={12} />
                        Member
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {group.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {group.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-800/60">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Users size={16} />
                      <span>{group.member_count || 0} members</span>
                    </div>
                    {group.creator && (
                      <p className="text-xs text-slate-500">
                        by {group.creator.full_name || 'Anonymous'}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/groups/${group.id}`}
                    className="block w-full text-center px-4 py-2 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-gradient-to-r hover:from-ember/20 hover:to-amber/20 hover:text-amber transition-all text-sm font-medium"
                  >
                    {group.is_member ? 'View Group →' : 'Join Group →'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
