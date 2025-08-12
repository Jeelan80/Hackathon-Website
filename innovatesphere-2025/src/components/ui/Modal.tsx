import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphismCard from './GlassmorphismCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Save current focus to restore later
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      
      // Focus trap
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // Focus first element
        setTimeout(() => firstElement?.focus(), 100);

        // Handle tab key for focus trapping
        const handleTabKey = (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Tab') {
            if (keyboardEvent.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement?.focus();
                keyboardEvent.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement?.focus();
                keyboardEvent.preventDefault();
              }
            }
          }
        };

        modal.addEventListener('keydown', handleTabKey);
        
        return () => {
          modal.removeEventListener('keydown', handleTabKey);
          // Restore focus when modal closes
          if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            previouslyFocusedElement.focus();
          }
        };
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby="modal-content"
          >
            <GlassmorphismCard className="relative" glow>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
                aria-label="Close modal"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title */}
              {title && (
                <h2 id="modal-title" className="text-2xl font-bold text-white mb-6 pr-8">
                  {title}
                </h2>
              )}

              {/* Content */}
              <div id="modal-content" className="text-white/90">
                {children}
              </div>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;