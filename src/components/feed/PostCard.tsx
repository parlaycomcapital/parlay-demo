'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import CommentsDrawer from './CommentsDrawer';
import Paywall from './Paywall';
import PremiumBadge from '@/components/ui/PremiumBadge';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import { useSupabaseSubscription } from '@/hooks/useSupabaseSubscription';
import { useLikes } from '@/hooks/useLikes';
import ShareTooltip from './ShareTooltip';
import { PLACEHOLDER_AVATAR } from '@/lib/mockData';

interface PostCardProps {
  post: any;
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  const premium = !!post.price || post.is_premium;
  const requiresSubscription = post.requires_subscription || post.is_premium;
  const { canAccessPremiumContent } = useSupabaseSubscription();
  const { liked, likesCount, toggleLike } = useLikes(post.id);
  const isVerified = post.author?.role === 'creator' || post.verified;
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  
  const canViewContent = !requiresSubscription || canAccessPremiumContent();
  const authorName = post.author?.name || post.author_name || 'Anonymous';
  const authorUsername = post.author?.username || post.author_username || 'anonymous';
  const authorAvatar = post.author?.avatar || PLACEHOLDER_AVATAR;

  const handleLike = () => {
    toggleLike();
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 600);
  };

  return (
    <motion.article
      className="bg-card/70 backdrop-blur-lg border border-slate-800/60 rounded-2xl shadow-[0_0_20px_rgba(230,62,48,0.05)] hover:shadow-[0_0_28px_rgba(245,166,35,0.15)] transition-all duration-300 overflow-hidden"
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4 md:p-6 flex flex-col gap-4">
        {/* Author Header */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-slate-800 flex-shrink-0">
            <Image
              src={authorAvatar}
              alt={authorName}
              fill
              className="object-cover"
              sizes="44px"
              priority={priority}
              unoptimized={authorAvatar === PLACEHOLDER_AVATAR}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-slate-100 leading-snug">{authorName}</h3>
              {isVerified && <VerifiedBadge size="sm" />}
              <span className="text-slate-500 text-sm">@{authorUsername}</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              {new Date(post.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Post Title */}
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg md:text-xl font-semibold text-white leading-snug">{post.title}</h2>
          {premium && <PremiumBadge variant="default" />}
          {post.sport && (
            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800/50 text-slate-300">
              {post.sport}
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          {canViewContent ? (
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          ) : (
            <div>
              {/* Content Preview */}
              {post.content && post.content.length > 0 && (
                <div className="relative mb-4">
                  <p className="text-slate-300 leading-relaxed line-clamp-3">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 && '...'}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-transparent pointer-events-none rounded-lg" />
                </div>
              )}
              <Paywall 
                message={requiresSubscription 
                  ? 'This content requires a Pro subscription to view' 
                  : `Unlock this premium analysis for $${Number(post.price).toFixed(2)}`}
                isSubscriptionRequired={requiresSubscription}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/60">
          <div className="flex gap-4 text-slate-400 relative">
            {/* Like button */}
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-1.5 hover:text-amber transition-colors ${
                liked ? 'text-ember' : ''
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              aria-label={liked ? 'Unlike this post' : 'Like this post'}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} strokeWidth={2} />
              <span className="text-sm font-medium">{likesCount || 0}</span>
            </motion.button>

            {/* Like spark animation */}
            <AnimatePresence>
              {showLikeAnimation && (
                <motion.div
                  className="absolute left-0 top-0 pointer-events-none"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="w-4 h-4 rounded-full bg-ember blur-sm" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Comments button */}
            <motion.button
              className="flex items-center gap-1.5 hover:text-amber transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open comments"
            >
              <MessageCircle size={20} strokeWidth={2} />
              <span className="text-sm font-medium">{post.comments_count || 0}</span>
            </motion.button>
            
            {/* Share button */}
            <ShareTooltip postId={post.id} title={post.title} />
          </div>

          {/* Premium CTA */}
          <div>
            {premium && !canViewContent ? (
              <motion.button
                type="button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(245,166,35,0.5)'
                }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-ember to-amber text-white text-sm font-medium shadow-[0_0_12px_rgba(245,166,35,0.3)] hover:shadow-[0_0_20px_rgba(245,166,35,0.5)] transition-all"
                aria-label={`Unlock premium content for $${Number(post.price).toFixed(2)}`}
              >
                {requiresSubscription ? 'Unlock Premium' : `$${Number(post.price).toFixed(2)}`}
              </motion.button>
            ) : (
              <span className="text-amber text-sm font-medium">Free Insight</span>
            )}
          </div>
        </div>
      </div>

      {/* Comments Drawer */}
      <CommentsDrawer postId={post.id} />
    </motion.article>
  );
}