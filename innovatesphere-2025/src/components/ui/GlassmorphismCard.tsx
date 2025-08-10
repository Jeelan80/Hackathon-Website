import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  glow?: boolean;
  animated?: boolean;
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 0.1,
  glow = false,
  animated = true,
}) => {
  const baseClasses = `
    ${blurClasses[blur]}
    border border-glass-border
    rounded-xl
    p-6
    ${glow ? 'shadow-lg shadow-primary-purple/20' : ''}
    ${className}
  `;

  const style = {
    background: `rgba(255, 255, 255, ${opacity})`,
  };

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        style={style}
        whileHover={glow ? { 
          boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
          scale: 1.02 
        } : { scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      {children}
    </div>
  );
};

export default GlassmorphismCard;