'use client';

interface StatusBadgeProps {
  status: string;
  variant?: 'report' | 'verification' | 'group';
}

export default function StatusBadge({ status, variant = 'report' }: StatusBadgeProps) {
  const getColors = () => {
    if (variant === 'report') {
      switch (status) {
        case 'open':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'review':
          return 'bg-amber/20 text-amber border-amber/30';
        case 'resolved':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'rejected':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
          return 'bg-slate-700/50 text-textSecondary border-slate-700';
      }
    } else if (variant === 'verification') {
      switch (status) {
        case 'pending':
          return 'bg-amber/20 text-amber border-amber/30';
        case 'approved':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'denied':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
          return 'bg-slate-700/50 text-textSecondary border-slate-700';
      }
    } else {
      // group
      switch (status) {
        case 'pending':
          return 'bg-amber/20 text-amber border-amber/30';
        case 'approved':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'rejected':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
          return 'bg-slate-700/50 text-textSecondary border-slate-700';
      }
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getColors()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

