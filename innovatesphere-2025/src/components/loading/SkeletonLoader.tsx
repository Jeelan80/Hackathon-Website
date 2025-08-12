import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'form';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const pulseAnimation = {
    animate: {
      opacity: [0.4, 0.8, 0.4]
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <GlassmorphismCard className={`p-6 ${className}`}>
            <motion.div {...pulseAnimation}>
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full mr-4" />
                <div className="flex-1">
                  <div className="h-4 bg-white/20 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-white/15 rounded w-1/2" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <div className="h-3 bg-white/15 rounded w-full" />
                <div className="h-3 bg-white/15 rounded w-5/6" />
                <div className="h-3 bg-white/15 rounded w-4/6" />
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center mt-6">
                <div className="h-8 bg-white/20 rounded w-20" />
                <div className="h-8 bg-white/20 rounded w-16" />
              </div>
            </motion.div>
          </GlassmorphismCard>
        );

      case 'text':
        return (
          <motion.div {...pulseAnimation} className={`space-y-2 ${className}`}>
            <div className="h-4 bg-white/20 rounded w-full" />
            <div className="h-4 bg-white/15 rounded w-5/6" />
            <div className="h-4 bg-white/15 rounded w-4/6" />
          </motion.div>
        );

      case 'avatar':
        return (
          <motion.div {...pulseAnimation} className={`flex items-center space-x-4 ${className}`}>
            <div className="w-16 h-16 bg-white/20 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-white/20 rounded mb-2 w-3/4" />
              <div className="h-3 bg-white/15 rounded w-1/2" />
            </div>
          </motion.div>
        );

      case 'button':
        return (
          <motion.div 
            {...pulseAnimation} 
            className={`h-12 bg-white/20 rounded-lg ${className}`}
          />
        );

      case 'form':
        return (
          <GlassmorphismCard className={`p-6 ${className}`}>
            <motion.div {...pulseAnimation} className="space-y-6">
              {/* Form Title */}
              <div className="h-6 bg-white/20 rounded w-1/2 mx-auto" />
              
              {/* Form Fields */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-white/15 rounded w-1/4" />
                  <div className="h-12 bg-white/10 rounded-lg border border-white/20" />
                </div>
              ))}
              
              {/* Submit Button */}
              <div className="h-12 bg-white/20 rounded-lg w-full" />
            </motion.div>
          </GlassmorphismCard>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="mb-4 last:mb-0">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;