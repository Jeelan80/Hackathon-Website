import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
  enableParallax?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  className = '',
  enableParallax = true
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [enableParallax]);

  const parallaxOffset = enableParallax ? scrollY * speed : 0;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        willChange: enableParallax ? 'transform' : 'auto'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxBackground;