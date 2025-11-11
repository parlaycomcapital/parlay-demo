'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { Image as ImageIcon, DollarSign, Lock, X } from 'lucide-react';

export default function Composer() {
  const { user, profile } = useAuth();
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState('4.99');
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sports = ['NFL', 'NBA', 'MLB', 'NHL', 'Soccer', 'Tennis', 'MMA', 'Other'];

  const handlePost = async () => {
    if (!content.trim() || !sport) return;
    if (!user) {
      alert('Please sign in to post');
      return;
    }

    setIsPosting(true);

    try {
      const { error} = await supabase.from('posts').insert([{
        author_id: user.id,
        content: content.trim(),
        sport,
        is_premium: isPremium,
        price: isPremium ? parseFloat(price) : 0,
        likes_count: 0,
        comments_count: 0,
      }]);

      if (error) throw error;

      // Success!
      setContent('');
      setSport('');
      setIsPremium(false);
      setPrice('4.99');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error posting:', err);
      alert('Failed to post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const isCreator = profile?.role === 'creator';

  return (
    <motion.div
      className="rounded-2xl border p-6 backdrop-blur-md relative overflow-hidden"
      style={{
        background: 'rgba(16, 26, 46, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 px-4 py-2 bg-success/20 border border-success/30 rounded-lg text-success text-sm font-medium"
          >
            ✓ Posted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="flex gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ember to-amber flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {profile?.full_name?.[0] || user?.email?.[0] || 'U'}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isCreator ? "Share your analysis or prediction..." : "Share your thoughts..."}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-textSecondary/50 resize-none min-h-[80px] text-base"
          style={{ fontFamily: 'Inter' }}
        />
      </div>

      {/* Sport & Options */}
      {content.trim() && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 mb-4"
        >
          {/* Sport Selector */}
          <div>
            <label className="text-textSecondary text-sm font-medium mb-2 block">
              Sport / League
            </label>
            <div className="flex flex-wrap gap-2">
              {sports.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSport(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sport === s
                      ? 'bg-gradient-to-r from-ember to-amber text-white shadow-ember-sm'
                      : 'bg-card/50 text-textSecondary hover:text-white hover:bg-card border border-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Toggle (Creators Only) */}
          {isCreator && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 border border-white/5">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber" />
                <div>
                  <div className="text-white font-medium text-sm">Premium Post</div>
                  <div className="text-textSecondary text-xs">Charge for this insight</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPremium(!isPremium)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  isPremium ? 'bg-gradient-to-r from-ember to-amber' : 'bg-white/10'
                }`}
              >
                <motion.div
                  animate={{ x: isPremium ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
          )}

          {/* Price Input (if premium) */}
          {isPremium && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-3"
            >
              <DollarSign className="w-5 h-5 text-amber" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.99"
                max="99.99"
                step="0.50"
                className="flex-1 px-4 py-2 bg-card/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-ember/50 transition-all"
              />
              <span className="text-textSecondary text-sm">per unlock</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-textSecondary hover:text-white">
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        <motion.button
          onClick={handlePost}
          disabled={!content.trim() || !sport || isPosting}
          whileHover={{ scale: content.trim() && sport ? 1.05 : 1 }}
          whileTap={{ scale: content.trim() && sport ? 0.95 : 1 }}
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
            content.trim() && sport
              ? 'bg-gradient-to-r from-ember to-amber text-white shadow-ember-sm hover:shadow-ember'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {isPosting ? 'Posting...' : 'Post'}
        </motion.button>
      </div>

      {/* Character Count */}
      {content.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-6 text-xs text-textSecondary/50"
        >
          {content.length} / 5000
        </motion.div>
      )}
    </motion.div>
  );
}
