'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp } from '@/lib/motion';

export default function CTA() {
  return (
    <section
      className="relative py-24 px-4 md:px-8"
      style={{
        background: 'linear-gradient(180deg, #0B132B 0%, #101A2E 100%)',
      }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-poppins font-semibold text-white mb-4">
            Join the Future of Sports Intelligence.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium text-lg hover:shadow-[0_0_28px_rgba(245,166,35,0.4)] transition-all"
                aria-label="Create account"
              >
                Create Account
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#feed"
                className="inline-block px-8 py-4 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 transition-all text-lg"
                aria-label="Explore feed"
              >
                Explore Feed
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

