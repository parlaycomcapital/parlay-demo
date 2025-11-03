'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer, Toast } from '@/components/ui/ToastNotification';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', options?: {
    action?: { label: string; onClick: () => void };
    duration?: number;
  }) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    options?: {
      action?: { label: string; onClick: () => void };
      duration?: number;
    }
  ): string => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: Toast = {
      id,
      message,
      type,
      action: options?.action,
      duration: options?.duration,
    };

    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
}

