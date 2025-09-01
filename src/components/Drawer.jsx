import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  side = 'right',
  ...props
}) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind drawer
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideClasses = {
    right: 'inset-y-0 right-0 transform translate-x-full',
    left: 'inset-y-0 left-0 transform -translate-x-full',
    top: 'inset-x-0 top-0 transform -translate-y-full',
    bottom: 'inset-x-0 bottom-0 transform translate-y-full',
  };

  const openClasses = {
    right: 'translate-x-0',
    left: 'translate-x-0',
    top: 'translate-y-0',
    bottom: 'translate-y-0',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm"
      onClick={onClose} // Close when clicking outside drawer
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      tabIndex="-1"
      ref={drawerRef}
      {...props}
    >
      <div
        className={cn(
          'absolute bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col transition-transform duration-300 ease-out',
          sideClasses[side],
          isOpen && openClasses[side],
          side === 'right' || side === 'left' ? 'w-80' : 'h-80', // Default width/height
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h3 id="drawer-title" className="text-xl font-semibold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
