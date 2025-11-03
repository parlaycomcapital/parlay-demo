'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import FlameButton from '@/components/ui/FlameButton';
import { copy } from '@/content/landing';

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
            {copy.finale.title}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <FlameButton
              href="/auth"
              variant="primary"
              ariaLabel={copy.finale.primaryCta}
            >
              {copy.finale.primaryCta}
            </FlameButton>
            <FlameButton
              href="#feed"
              variant="secondary"
              ariaLabel={copy.finale.secondaryCta}
            >
              {copy.finale.secondaryCta}
            </FlameButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

