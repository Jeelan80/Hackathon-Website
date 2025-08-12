import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  fallback?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  decorative?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  placeholder,
  fallback = '/images/placeholder.jpg',
  ariaLabel,
  ariaDescribedBy,
  role,
  decorative = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
  };

  // Generate WebP source if supported
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const isWebPSupported = typeof window !== 'undefined' && 
    window.HTMLCanvasElement && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {placeholder && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              {placeholder}
            </div>
          )}
        </motion.div>
      )}

      {/* Optimized Image */}
      <picture>
        {/* WebP source for supported browsers */}
        {isWebPSupported && !hasError && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        
        {/* Fallback image */}
        <motion.img
          src={currentSrc}
          alt={decorative ? '' : alt}
          width={width}
          height={height}
          loading={loading}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          role={decorative ? 'presentation' : role}
          aria-hidden={decorative}
        />
      </picture>

      {/* Error state */}
      {hasError && currentSrc === fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400 text-sm">
          Image not available
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;