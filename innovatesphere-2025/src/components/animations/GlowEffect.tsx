import React from 'react';
import { motion } from 'framer-motion';

interface GlowEffectProps {
  children: React.ReactNode;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red';
  intensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  color = 'purple',
  intensity = 'medium',
  size = 'md',
  animated = false,
  className = ''
}) => {
  const getGlowColor = () => {
    const colors = {
      purple: 'rgba(79, 70, 229, ',
      blue: 'rgba(59, 130, 246, ',
      green: 'rgba(34, 197, 94, ',
      orange: 'rgba(249, 115, 22, ',
      red: 'rgba(239, 68, 68, '
    };
    return colors[color];
  };

  const getIntensity = () => {
    const intensities = {
      low: '0.3',
      medium: '0.5',
      high: '0.7'
    };
    return intensities[intensity];
  };

  const getSize = () => {
    const sizes = {
      sm: '10px',
      md: '20px',
      lg: '30px'
    };
    return sizes[size];
  };

  const glowColor = getGlowColor();
  const glowIntensity = getIntensity();
  const glowSize = getSize();

  const staticGlow = {
    boxShadow: `0 0 ${glowSize} ${glowColor}${glowIntensity})`
  };

  const animatedGlow = {
    boxShadow: [
      `0 0 ${glowSize} ${glowColor}${glowIntensity})`,
      `0 0 ${parseInt(glowSize) * 1.5}px ${glowColor}${parseFloat(glowIntensity) * 1.2})`,
      `0 0 ${glowSize} ${glowColor}${glowIntensity})`
    ]
  };

  if (animated) {
    return (
      <motion.div
        className={`relative ${className}`}
        animate={animatedGlow}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={staticGlow}
      whileHover={{
        boxShadow: `0 0 ${parseInt(glowSize) * 1.3}px ${glowColor}${parseFloat(glowIntensity) * 1.1})`
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlowEffect;