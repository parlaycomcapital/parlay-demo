'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';
import { createAuditLog } from '@/lib/admin';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  type: 'approve' | 'reject' | 'resolve';
}

function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
}: ActionModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-card/95 backdrop-blur-lg border border-slate-800 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-4 mb-4">
                {type === 'approve' && (
                  <div className="p-3 rounded-full bg-green-500/20">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                )}
                {type === 'reject' && (
                  <div className="p-3 rounded-full bg-red-500/20">
                    <X className="w-6 h-6 text-red-400" />
                  </div>
                )}
                {type === 'resolve' && (
                  <div className="p-3 rounded-full bg-amber/20">
                    <AlertTriangle className="w-6 h-6 text-amber" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <p className="text-textSecondary mb-6">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800/50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-xl text-white font-medium transition-all disabled:opacity-50 ${
                    type === 'approve'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                      : type === 'reject'
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                      : 'bg-gradient-to-r from-ember to-amber hover:shadow-ember'
                  }`}
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ActionButtonsProps {
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  onResolve?: () => Promise<void>;
  approveLabel?: string;
  rejectLabel?: string;
  resolveLabel?: string;
}

export default function ActionButtons({
  onApprove,
  onReject,
  onResolve,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
  resolveLabel = 'Resolve',
}: ActionButtonsProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | 'resolve';
  }>({ isOpen: false, type: 'approve' });

  const handleConfirm = async () => {
    if (modalState.type === 'approve' && onApprove) {
      await onApprove();
    } else if (modalState.type === 'reject' && onReject) {
      await onReject();
    } else if (modalState.type === 'resolve' && onResolve) {
      await onResolve();
    }
  };

  const getModalProps = () => {
    switch (modalState.type) {
      case 'approve':
        return {
          title: 'Confirm Approval',
          message: 'Are you sure you want to approve this? This action will be logged.',
        };
      case 'reject':
        return {
          title: 'Confirm Rejection',
          message: 'Are you sure you want to reject this? This action cannot be undone easily.',
        };
      case 'resolve':
        return {
          title: 'Mark as Resolved',
          message: 'Mark this item as resolved? This will update its status.',
        };
      default:
        return { title: '', message: '' };
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {onApprove && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalState({ isOpen: true, type: 'approve' })}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium text-sm hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] transition-all"
            aria-label={approveLabel}
          >
            <Check size={16} className="inline mr-1.5" />
            {approveLabel}
          </motion.button>
        )}
        {onResolve && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalState({ isOpen: true, type: 'resolve' })}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-ember to-amber text-white font-medium text-sm hover:shadow-ember transition-all"
            aria-label={resolveLabel}
          >
            <Check size={16} className="inline mr-1.5" />
            {resolveLabel}
          </motion.button>
        )}
        {onReject && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalState({ isOpen: true, type: 'reject' })}
            className="px-4 py-2 rounded-xl border border-red-500/50 text-red-400 font-medium text-sm hover:bg-red-500/10 transition-all"
            aria-label={rejectLabel}
          >
            <X size={16} className="inline mr-1.5" />
            {rejectLabel}
          </motion.button>
        )}
      </div>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: 'approve' })}
        onConfirm={handleConfirm}
        type={modalState.type}
        {...getModalProps()}
      />
    </>
  );
}

