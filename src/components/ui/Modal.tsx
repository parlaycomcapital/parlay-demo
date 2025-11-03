'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalVariants, backdropVariants } from '@/lib/motion';

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
        <>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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
        </>
      )}
    </AnimatePresence>
  );
}
