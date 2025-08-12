/**
 * Monitoring and error tracking utilities
 */

// Performance monitoring
export const performanceMonitoring = {
  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if enabled
        if (import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
          // Analytics tracking would go here
          console.log('Tracking LCP:', lastEntry.startTime);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('Performance observer not supported');
    }
  },

  // Track custom metrics
  trackCustomMetric: (name: string, value: number, unit = 'ms') => {
    if (import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
      console.log(`Custom metric - ${name}: ${value}${unit}`);
      
      // Send to analytics service
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'timing_complete', {
          name: name,
          value: Math.round(value)
        });
      }
    }
  },

  // Track component render times
  trackComponentRender: (componentName: string, renderTime: number) => {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log(`${componentName} render time: ${renderTime}ms`);
    }
    
    performanceMonitoring.trackCustomMetric(`component_render_${componentName}`, renderTime);
  },

  // Track user interactions
  trackInteraction: (action: string, element: string, value?: number) => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      console.log(`Interaction - ${action} on ${element}`, value);
      
      // Send to analytics
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', action, {
          event_category: 'engagement',
          event_label: element,
          value: value
        });
      }
    }
  }
};

// Error tracking
export const errorTracking = {
  // Initialize error tracking
  init: () => {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', (event) => {
      errorTracking.logError(event.error, {
        type: 'javascript_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      errorTracking.logError(event.reason, {
        type: 'unhandled_promise_rejection'
      });
    });

    // React error boundary integration
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
      console.log('Error tracking initialized');
    }
  },

  // Log errors
  logError: (error: Error | string, context?: Record<string, any>) => {
    const errorInfo = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...context
    };

    console.error('Error logged:', errorInfo);

    // Send to error tracking service (Sentry, LogRocket, etc.)
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
      // This would integrate with your error tracking service
      // Example: Sentry.captureException(error, { extra: context });
    }
  },

  // Log custom events
  logEvent: (event: string, data?: Record<string, any>) => {
    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      console.log(`Event: ${event}`, data);
    }

    // Send to analytics
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', event, data);
      }
    }
  }
};

// Deployment health checks
export const healthChecks = {
  // Check if all critical resources are loaded
  checkCriticalResources: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const criticalResources = [
        'link[rel="stylesheet"]',
        'script[src*="index"]'
      ];

      let loadedCount = 0;
      const totalResources = criticalResources.length;

      criticalResources.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          loadedCount++;
        }
      });

      const allLoaded = loadedCount === totalResources;
      
      if (!allLoaded) {
        errorTracking.logError('Critical resources not loaded', {
          loaded: loadedCount,
          total: totalResources
        });
      }

      resolve(allLoaded);
    });
  },

  // Check API connectivity
  checkAPIHealth: async (): Promise<boolean> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) return true; // No API configured

      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        timeout: 5000
      } as RequestInit);

      return response.ok;
    } catch (error) {
      errorTracking.logError('API health check failed', { error });
      return false;
    }
  },

  // Run all health checks
  runHealthChecks: async () => {
    const results = {
      resources: await healthChecks.checkCriticalResources(),
      api: await healthChecks.checkAPIHealth(),
      timestamp: new Date().toISOString()
    };

    console.log('Health check results:', results);

    // Log to monitoring service
    if (import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
      errorTracking.logEvent('health_check', results);
    }

    return results;
  }
};

// Platform-specific monitoring
export const platformMonitoring = {
  // Detect deployment platform
  detectPlatform: (): string => {
    const hostname = window.location.hostname;
    
    if (hostname.includes('netlify')) return 'netlify';
    if (hostname.includes('vercel')) return 'vercel';
    if (hostname.includes('herokuapp')) return 'heroku';
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'local';
    
    return 'unknown';
  },

  // Track platform-specific metrics
  trackPlatformMetrics: () => {
    const platform = platformMonitoring.detectPlatform();
    
    performanceMonitoring.trackCustomMetric('deployment_platform', 1);
    errorTracking.logEvent('platform_detected', { platform });

    // Platform-specific optimizations
    switch (platform) {
      case 'netlify':
        // Netlify-specific tracking
        break;
      case 'vercel':
        // Vercel-specific tracking
        break;
      case 'heroku':
        // Heroku-specific tracking
        break;
    }
  }
};

// Initialize monitoring
export const initializeMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Initialize error tracking
  errorTracking.init();

  // Track web vitals
  performanceMonitoring.trackWebVitals();

  // Track platform
  platformMonitoring.trackPlatformMetrics();

  // Run initial health checks
  setTimeout(() => {
    healthChecks.runHealthChecks();
  }, 1000);

  console.log('Monitoring initialized');
};

export default {
  performanceMonitoring,
  errorTracking,
  healthChecks,
  platformMonitoring,
  initializeMonitoring
};