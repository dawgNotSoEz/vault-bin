import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '@/components/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = useCallback((message, options = {}) => {
    return addToast(message, options.type || 'info', options.duration || 3000);
  }, [addToast]);

  const success = useCallback((message, options = {}) => {
    return addToast(message, 'success', options.duration || 3000);
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast(message, 'error', options.duration || 5000);
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast(message, 'warning', options.duration || 4000);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
