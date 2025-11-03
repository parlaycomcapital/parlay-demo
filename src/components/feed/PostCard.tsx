'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import CommentsDrawer from './CommentsDrawer';
import Paywall from './Paywall';
import PremiumBadge from '@/components/ui/PremiumBadge';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import { useSubscription } from '@/hooks/useSubscription';
import { useLikes } from '@/hooks/useLikes';
import ShareTooltip from './ShareTooltip';
import { PLACEHOLDER_AVATAR, PLACEHOLDER_POST_IMAGE } from '@/lib/mockData';

export default function PostCard({ post }: { post: any }) {
  const premium = !!post.price || post.is_premium;
  const requiresSubscription = post.requires_subscription || post.is_premium;
  const { canAccessPremiumContent } = useSubscription();
  const { liked, likesCount, toggleLike } = useLikes(post.id);
  const isVerified = post.author?.role === 'creator' || post.verified;
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  
  const canViewContent = !requiresSubscription || canAccessPremiumContent();

  const handleLike = () => {
    toggleLike();
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 600);
  };

  return (
    <motion.article
      className="max-w-[680px] w-full mx-auto rounded-2xl shadow-ember bg-card p-4 md:p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <header className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 flex items-center justify-center overflow-hidden ring-2 ring-navy-300 flex-shrink-0"
          style={{
            backgroundImage: `url(${PLACEHOLDER_AVATAR})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
        >
          {!PLACEHOLDER_AVATAR && (
            <span className="text-lg font-bold text-amber">{(post.title || 'A')[0].toUpperCase()}</span>
          )}
        </motion.div>
        
        {/* Title and Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading font-semibold text-base md:text-lg text-white truncate">{post.title}</h3>
            {isVerified && <VerifiedBadge size="sm" />}
            <span className="badge flex-shrink-0">{post.sport}</span>
            {premium && (
              <PremiumBadge variant="default" />
            )}
          </div>
          <p className="text-xs text-slatex-500 mt-1">
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="mb-4">
        {canViewContent ? (
          <p className="text-slatex-300 leading-[1.4] text-[clamp(0.9rem,1vw,1.1rem)] whitespace-pre-wrap">{post.content}</p>
        ) : (
          <div>
            {/* Content Preview/Teaser */}
            {post.content && post.content.length > 0 && (
              <div className="relative mb-4">
                <p className="text-slatex-300 leading-[1.4] line-clamp-3 text-[clamp(0.9rem,1vw,1.1rem)]">
                  {post.content.substring(0, 150)}
                  {post.content.length > 150 && '...'}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-300 via-navy-300/80 to-transparent pointer-events-none rounded-lg" />
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
      <footer className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div className="flex items-center gap-4 relative">
          {/* Like button with spark animation */}
          <motion.button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium ${liked ? 'text-ember' : 'text-slatex-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            aria-label={liked ? 'Unlike this post' : 'Like this post'}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} strokeWidth={2} />
            <span>{likesCount || 0}</span>
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
          
          <motion.button
            className="flex items-center gap-1.5 text-sm font-medium text-slatex-400 hover:text-amber transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open comments"
          >
            <MessageCircle size={18} strokeWidth={2} />
            <span>{post.comments_count || 0}</span>
          </motion.button>
          
          <ShareTooltip postId={post.id} title={post.title} />
        </div>

        {/* CTA Button */}
        {premium && !canViewContent && (
          <motion.button
            type="button"
            className="px-4 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-ember to-amber text-white hover:shadow-ember-sm transition-all duration-fast"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 20px rgba(230, 62, 48, 0.4)' 
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Buy premium content for $${Number(post.price).toFixed(2)}`}
          >
            ${Number(post.price).toFixed(2)}
          </motion.button>
        )}
      </footer>

      {/* Comments Drawer */}
      <CommentsDrawer postId={post.id} />
    </motion.article>
  );
}