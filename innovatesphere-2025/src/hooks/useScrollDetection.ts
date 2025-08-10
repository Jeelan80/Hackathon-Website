import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolled: boolean;
  isNearTop: boolean;
  isNearBottom: boolean;
}

export const useScrollDetection = (threshold: number = 50) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isScrolled: false,
    isNearTop: true,
    isNearBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      const isScrolled = currentScrollY > threshold;
      const isNearTop = currentScrollY < threshold;
      const isNearBottom = currentScrollY + windowHeight >= documentHeight - 100;

      setScrollState({
        scrollY: currentScrollY,
        scrollDirection: direction,
        isScrolled,
        isNearTop,
        isNearBottom,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
};

export default useScrollDetection;