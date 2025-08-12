import React from 'react';
import { motion } from 'framer-motion';
import { GlowEffect } from '../animations';

interface AnimatedButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick: () => void;
  glow?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary-purple to-primary-blue text-white',
  secondary: 'bg-glass-white border border-glass-border text-white backdrop-blur-md',
  ghost: 'bg-transparent border border-glass-border text-white hover:bg-glass-white',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  glow = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    rounded-lg
    font-semibold
    transition-all
    duration-300
    cursor-pointer
    ${glow && variant === 'primary' ? 'animate-pulse-glow' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const button = (
    <motion.button
      className={baseClasses}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { 
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
      }}
      whileTap={disabled ? {} : { opacity: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );

  if (glow && variant === 'primary') {
    return (
      <GlowEffect color="purple" intensity="medium" size="md">
        {button}
      </GlowEffect>
    );
  }

  return button;
};

export default AnimatedButton;