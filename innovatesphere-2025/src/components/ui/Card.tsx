import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphismCard from './GlassmorphismCard';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  hover = true,
  glow = false,
  icon,
}) => {
  return (
    <GlassmorphismCard 
      className={className} 
      glow={glow}
      animated={hover}
    >
      {icon && (
        <motion.div 
          className="mb-4 text-primary-blue"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          {icon}
        </motion.div>
      )}
      
      {title && (
        <motion.h3 
          className="text-xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {children}
      </motion.div>
    </GlassmorphismCard>
  );
};

export default Card;