'use client';

import { motion } from 'framer-motion';

export default function PostCardSkeleton() {
  return (
    <motion.div
      className="card p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Skeleton */}
      <div className="flex items-start gap-3 mb-4">
        <div className="skeleton w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className="skeleton h-5 rounded mb-2 w-3/4" />
          <div className="skeleton h-3 rounded w-1/3" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="skeleton h-4 rounded w-full" />
        <div className="skeleton h-4 rounded w-full" />
        <div className="skeleton h-4 rounded w-5/6" />
        <div className="skeleton h-4 rounded w-4/6" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <div className="skeleton h-6 w-12 rounded" />
          <div className="skeleton h-6 w-12 rounded" />
        </div>
        <div className="skeleton h-8 w-20 rounded" />
      </div>
    </motion.div>
  );
}