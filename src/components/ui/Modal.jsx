import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Modal = ({ 
  open, 
  onClose, 
  children, 
  className,
  closeOnBackdrop = true 
}) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className={cn(
              'relative w-full max-w-lg max-h-[90vh] overflow-hidden',
              'bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl',
              'focus:outline-none',
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader = ({ children, onClose, className }) => (
  <div className={cn('flex items-center justify-between p-6 border-b border-zinc-800', className)}>
    {children}
    {onClose && (
      <button
        onClick={onClose}
        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        aria-label="Close modal"
      >
        <X size={20} className="text-zinc-400" />
      </button>
    )}
  </div>
);

const ModalContent = ({ children, className }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

const ModalFooter = ({ children, className }) => (
  <div className={cn('flex items-center justify-end gap-3 p-6 border-t border-zinc-800', className)}>
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
