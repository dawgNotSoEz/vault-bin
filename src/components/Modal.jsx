import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
  ...props
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex="-1"
      ref={modalRef}
      {...props}
    >
      <div
        className={cn(
          'relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col',
          'max-h-[90vh] overflow-hidden',
          size === 'sm' && 'w-full max-w-sm',
          size === 'md' && 'w-full max-w-md',
          size === 'lg' && 'w-full max-w-lg',
          size === 'xl' && 'w-full max-w-xl',
          size === 'full' && 'w-full max-w-3xl',
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h3 id="modal-title" className="text-xl font-semibold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label="Close modal"
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

export default Modal;
