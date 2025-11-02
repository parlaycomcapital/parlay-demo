'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="card w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar relative"
          >
            {title && (
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="icon-btn text-slate-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 icon-btn text-slate-400 hover:text-white z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}

            <div className={title ? '' : 'pt-2'}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
