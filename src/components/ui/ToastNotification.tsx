'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface ToastNotificationProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastNotification({ toast, onRemove }: ToastNotificationProps) {
  const duration = toast.duration || 5000;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-amber" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-amber/10 border-amber/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      className={`rounded-xl ${getColors()} border p-4 backdrop-blur-lg min-w-[300px] max-w-md shadow-lg`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white">{toast.message}</p>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-medium text-amber hover:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastNotification toast={toast} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Toast manager hook
let toastIdCounter = 0;

export function useToast() {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    options?: {
      action?: { label: string; onClick: () => void };
      duration?: number;
    }
  ): string => {
    const id = `toast-${++toastIdCounter}`;
    
    // This would typically be managed by a context/state
    // For now, we'll dispatch a custom event
    window.dispatchEvent(
      new CustomEvent('parlay-toast', {
        detail: {
          id,
          message,
          type,
          ...options,
        },
      })
    );

    return id;
  };

  return { showToast };
}

