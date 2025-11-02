'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Lock, TrendingUp } from 'lucide-react';
import CommentsDrawer from './CommentsDrawer';
import Paywall from './Paywall';
import { useSubscription } from '@/hooks/useSubscription';
import { useLikes } from '@/hooks/useLikes';
import ShareTooltip from './ShareTooltip';
import { PLACEHOLDER_AVATAR, PLACEHOLDER_POST_IMAGE } from '@/lib/mockData';

export default function PostCard({ post }: { post: any }) {
  const premium = !!post.price || post.is_premium;
  const requiresSubscription = post.requires_subscription || post.is_premium;
  const { canAccessPremiumContent } = useSubscription();
  const { liked, likesCount, toggleLike } = useLikes(post.id);
  
  const canViewContent = !requiresSubscription || canAccessPremiumContent();

  return (
    <motion.article
      className="card card-hover p-6"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {/* Header */}
      <header className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-ember/30 to-amber/30 flex items-center justify-center overflow-hidden ring-2 ring-navy-300 flex-shrink-0"
          style={{
            backgroundImage: `url(${PLACEHOLDER_AVATAR})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!PLACEHOLDER_AVATAR && (
            <span className="text-lg font-bold text-amber">{(post.title || 'A')[0].toUpperCase()}</span>
          )}
        </div>
        
        {/* Title and Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading font-semibold text-base text-white truncate">{post.title}</h3>
            <span className="badge flex-shrink-0">{post.sport}</span>
            {premium && (
              <span className="badge flex items-center gap-1 bg-amber/10 text-amber border-amber/20 flex-shrink-0">
                <Lock size={12} />
                Premium
              </span>
            )}
          </div>
          <p className="text-xs text-slatex-500 mt-1">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </header>

      {/* Content */}
      <div className="mb-4">
        {canViewContent ? (
          <p className="text-slatex-300 leading-relaxed text-sm whitespace-pre-wrap">{post.content}</p>
        ) : (
          <div>
            {/* Content Preview/Teaser */}
            {post.content && post.content.length > 0 && (
              <div className="relative mb-4">
                <p className="text-slatex-300 leading-relaxed line-clamp-3 text-sm">
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
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 text-sm ${liked ? 'text-ember' : 'text-slatex-400'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            aria-label={liked ? 'Unlike this post' : 'Like this post'}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} strokeWidth={2} />
            <span className="font-medium">{likesCount || 0}</span>
          </motion.button>
          
          <motion.button
            className="flex items-center gap-1.5 text-sm text-slatex-400 hover:text-amber transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open comments"
          >
            <MessageCircle size={18} strokeWidth={2} />
            <span className="font-medium">{post.comments_count || 0}</span>
          </motion.button>
          
          <ShareTooltip postId={post.id} title={post.title} />
        </div>

        {/* CTA Button */}
        {premium && !canViewContent && (
          <motion.button
            type="button"
            className="px-4 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-ember to-amber text-white hover:shadow-ember-sm transition-all duration-fast"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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