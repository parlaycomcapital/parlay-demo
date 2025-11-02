'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { isPlaceholderMode, mockGroups, PLACEHOLDER_GROUP_AVATAR } from '@/lib/mockData';
import { supabase, Group } from '@/lib/supabaseClient';
import CreateGroupModal from '@/components/groups/CreateGroupModal';

export default function GroupsPage() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    
    // Use mock groups in placeholder mode
    if (isPlaceholderMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setGroups(mockGroups as Group[]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('is_public', true)
        .order('member_count', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error: any) {
      console.warn('Error fetching groups (placeholder mode fallback):', error.message);
      setGroups(mockGroups as Group[]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-narrow">
      <div className="mb-5 lg:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Communities</h1>
            <p className="text-slatex-400 text-sm">
              Join communities and connect with fellow sports analysts
            </p>
          </div>
          {session?.user?.role === 'creator' && (
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileTap={{ scale: 0.95 }}
              className="btn-grad flex items-center gap-2 px-4 py-2"
            >
              <Plus size={18} />
              Create Group
            </motion.button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slatex-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communities..."
            className="input pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slatex-400">Loading communities...</p>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="text-slatex-500 mx-auto mb-4" />
          <p className="text-slatex-400 mb-2">No communities found</p>
          <p className="text-slatex-500 text-sm">
            {searchQuery ? 'Try a different search term' : 'Be the first to create a community'}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredGroups.map((group, index) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card card-hover p-5 lg:p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-xl flex-shrink-0 bg-gradient-to-br from-ember to-amber flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundImage: group.avatar_url || PLACEHOLDER_GROUP_AVATAR 
                        ? `url(${group.avatar_url || PLACEHOLDER_GROUP_AVATAR})` 
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!group.avatar_url && !PLACEHOLDER_GROUP_AVATAR && (
                      <Users size={24} className="text-white opacity-80" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 truncate">{group.name}</h3>
                    <p className="text-slatex-400 text-sm line-clamp-2">{group.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slatex-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{group.member_count || 0} members</span>
                  </div>
                  {group.is_public ? (
                    <span className="badge">Public</span>
                  ) : (
                    <span className="badge bg-amber/20 text-amber">Private</span>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      <CreateGroupModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchGroups}
      />
    </div>
  );
}
