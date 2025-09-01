import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose(id);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  const iconMap = {
    success: CheckCircle,
    info: Info,
    warning: AlertTriangle,
    error: XCircle,
  };

  const colorMap = {
    success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    error: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const IconComponent = iconMap[type] || Info;

  if (!isVisible) return null;

  return createPortal(
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center space-x-3 p-4 rounded-xl shadow-lg transition-all duration-300 transform',
        colorMap[type],
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      )}
      role="alert"
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium flex-grow">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) {
            onClose(id);
          }
        }}
        className="p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>,
    document.body
  );
};

export default Toast;
