import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window === 'undefined' || !window.performance) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      };

      // Measure Web Vitals if available
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) {
            metrics.firstContentfulPaint = fcp.startTime;
          }
        });

        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          // Paint timing not supported
        }

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            metrics.largestContentfulPaint = lastEntry.startTime;
          }
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP not supported
        }
      }

      // Log metrics in development
      if (import.meta.env.DEV) {
        console.group('🚀 Performance Metrics');
        console.log('Load Time:', metrics.loadTime.toFixed(2), 'ms');
        console.log('DOM Content Loaded:', metrics.domContentLoaded.toFixed(2), 'ms');
        if (metrics.firstContentfulPaint) {
          console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2), 'ms');
        }
        if (metrics.largestContentfulPaint) {
          console.log('Largest Contentful Paint:', metrics.largestContentfulPaint.toFixed(2), 'ms');
        }
        console.groupEnd();
      }

      // In production, you could send these metrics to an analytics service
      // analytics.track('performance_metrics', metrics);
    };

    // Measure performance after the page loads
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);
};

export default usePerformanceMonitor;