import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  threshold = 0.1,
  className = ''
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial={{
        opacity: 0,
        ...initialPosition
      }}
      animate={{
        opacity: isIntersecting ? 1 : 0,
        x: isIntersecting ? 0 : initialPosition.x,
        y: isIntersecting ? 0 : initialPosition.y
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;