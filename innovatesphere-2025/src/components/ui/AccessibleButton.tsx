import React from 'react';
import { motion } from 'framer-motion';
import { useKeyboardNavigation, useAccessibility } from '../../hooks';

interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  role?: string;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  type = 'button',
  role
}) => {
  const { shouldReduceMotion } = useAccessibility();
  
  const { ref } = useKeyboardNavigation({
    onEnter: () => !disabled && !loading && onClick(),
    onSpace: () => !disabled && !loading && onClick(),
    disabled: disabled || loading
  });

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:from-primary-purple/90 hover:to-primary-blue/90 focus:ring-primary-blue',
    secondary: 'bg-glass-white border border-glass-border text-white backdrop-blur-md hover:bg-white/20 focus:ring-white',
    ghost: 'bg-transparent border border-glass-border text-white hover:bg-glass-white focus:ring-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    rounded-lg
    font-semibold
    transition-all
    duration-300
    cursor-pointer
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-offset-black
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:transform-none
    ${className}
  `;

  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  const MotionButton = shouldReduceMotion ? 'button' : motion.button;
  const motionProps = shouldReduceMotion ? {} : {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
  };

  return (
    <MotionButton
      ref={ref as any}
      type={type}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      role={role}
      {...motionProps}
    >
      {loading && (
        <span className="inline-flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
          <span className="sr-only">Please wait, processing your request</span>
        </span>
      )}
      {!loading && children}
    </MotionButton>
  );
};

export default AccessibleButton;