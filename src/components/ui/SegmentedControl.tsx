'use client';

import { motion } from 'framer-motion';

interface SegmentedControlProps {
  options: Array<{ value: string; label: string; description?: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  className = '',
  disabled = false,
}: SegmentedControlProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  return (
    <div
      className={`relative flex gap-2 p-1 bg-slate-900/50 rounded-lg ${className}`}
      role="tablist"
      aria-label="Role selection"
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`panel-${option.value}`}
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all relative z-10 ${
              isSelected
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option.label}
          </button>
        );
      })}
      {selectedIndex >= 0 && (
        <motion.div
          className="absolute top-1 bottom-1 bg-gradient-to-r from-ember to-amber rounded-md shadow-[0_0_12px_rgba(245,166,35,0.3)]"
          layoutId="selectedTab"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          style={{
            left: `${(selectedIndex / options.length) * 100}%`,
            width: `${100 / options.length}%`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

