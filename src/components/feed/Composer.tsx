'use client';

import { motion } from 'framer-motion';

export default function Composer() {
  return (
    <motion.div
      className="card card-hover p-5 mb-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-amber" />
        <input className="input" placeholder="Share your analysis or insight…" />
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button className="icon-btn">🏷️</button>
        <button className="icon-btn">📎</button>
        <motion.button
          className="btn-grad"
          whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(224, 161, 76, 0.3)' }}
          whileTap={{ scale: 0.95, boxShadow: 'none' }}
          transition={{ duration: 0.2 }}
          aria-label="Post"
        >
          Post
        </motion.button>
      </div>
    </motion.div>
  );
}
