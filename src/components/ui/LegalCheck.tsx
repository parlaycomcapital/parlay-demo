'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LegalCheckProps {
  tosChecked: boolean;
  ageChecked: boolean;
  onTosChange: (checked: boolean) => void;
  onAgeChange: (checked: boolean) => void;
  errors?: {
    tos?: string;
    age?: string;
  };
  className?: string;
}

export default function LegalCheck({
  tosChecked,
  ageChecked,
  onTosChange,
  onAgeChange,
  errors,
  className = '',
}: LegalCheckProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={tosChecked}
          onChange={(e) => onTosChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/70 text-amber focus:ring-2 focus:ring-amber/50 focus:border-amber/50 cursor-pointer"
          aria-describedby={errors?.tos ? 'tos-error' : undefined}
        />
        <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
          I agree to{' '}
          <Link
            href="/terms"
            className="text-amber hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="text-amber hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors?.tos && (
        <motion.p
          id="tos-error"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 ml-7"
          role="alert"
        >
          {errors.tos}
        </motion.p>
      )}

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={ageChecked}
          onChange={(e) => onAgeChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/70 text-amber focus:ring-2 focus:ring-amber/50 focus:border-amber/50 cursor-pointer"
          aria-describedby={errors?.age ? 'age-error' : undefined}
        />
        <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
          I confirm I'm 18+
        </span>
      </label>
      {errors?.age && (
        <motion.p
          id="age-error"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 ml-7"
          role="alert"
        >
          {errors.age}
        </motion.p>
      )}
    </div>
  );
}

