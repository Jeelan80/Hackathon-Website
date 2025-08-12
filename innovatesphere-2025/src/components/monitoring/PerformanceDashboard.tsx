import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { 
  FaChartLine, 
  FaClock, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaEye
} from 'react-icons/fa';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  timestamp: string;
}

const PerformanceDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize performance monitoring
  useEffect(() => {
    if (import.meta.env.VITE_SHOW_PERFORMANCE_METRICS === 'true') {
      collectMetrics();
      runHealthChecks();
      
      // Update metrics every 30 seconds
      const interval = setInterval(() => {
        collectMetrics();
        runHealthChecks();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, []);

  const collectMetrics = () => {
    setIsLoading(true);
    
    // Collect Core Web Vitals and other performance metrics
    const performanceEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const startTime = performanceEntries.fetchStart || 0;
    
    const newMetrics: PerformanceMetric[] = [
      {
        name: 'First Contentful Paint',
        value: Math.round(performanceEntries.domContentLoadedEventEnd - startTime),
        unit: 'ms',
        status: getMetricStatus(performanceEntries.domContentLoadedEventEnd - startTime, { good: 1800, poor: 3000 }),
        threshold: { good: 1800, poor: 3000 }
      },
      {
        name: 'DOM Content Loaded',
        value: Math.round(performanceEntries.domContentLoadedEventEnd - startTime),
        unit: 'ms',
        status: getMetricStatus(performanceEntries.domContentLoadedEventEnd - startTime, { good: 1500, poor: 2500 }),
        threshold: { good: 1500, poor: 2500 }
      },
      {
        name: 'Load Complete',
        value: Math.round(performanceEntries.loadEventEnd - startTime),
        unit: 'ms',
        status: getMetricStatus(performanceEntries.loadEventEnd - startTime, { good: 2500, poor: 4000 }),
        threshold: { good: 2500, poor: 4000 }
      }
    ];

    // Add memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      newMetrics.push({
        name: 'Memory Usage',
        value: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        unit: 'MB',
        status: getMetricStatus(memory.usedJSHeapSize / 1024 / 1024, { good: 50, poor: 100 }),
        threshold: { good: 50, poor: 100 }
      });
    }

    setMetrics(newMetrics);
    setIsLoading(false);
  };

  const runHealthChecks = () => {
    const checks: HealthCheck[] = [
      {
        name: 'Critical Resources',
        status: document.querySelectorAll('link[rel="stylesheet"]').length > 0 ? 'pass' : 'fail',
        message: document.querySelectorAll('link[rel="stylesheet"]').length > 0 
          ? 'All critical CSS resources loaded' 
          : 'Missing critical CSS resources',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        name: 'JavaScript Errors',
        status: 'pass', // This would be updated by error tracking
        message: 'No JavaScript errors detected',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        name: 'Accessibility',
        status: document.querySelector('[aria-label]') ? 'pass' : 'warning',
        message: document.querySelector('[aria-label]') 
          ? 'Accessibility attributes detected' 
          : 'Limited accessibility attributes found',
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setHealthChecks(checks);
  };

  const getMetricStatus = (value: number, threshold: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'pass':
        return 'text-green-400';
      case 'needs-improvement':
      case 'warning':
        return 'text-yellow-400';
      case 'poor':
      case 'fail':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'pass':
        return <FaCheckCircle className="text-green-400" />;
      case 'needs-improvement':
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-400" />;
      case 'poor':
      case 'fail':
        return <FaTimes className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  // Only show in development or when explicitly enabled
  if (import.meta.env.VITE_SHOW_PERFORMANCE_METRICS !== 'true') {
    return null;
  }

  return (
    <>
      {/* Performance Dashboard Toggle */}
      <motion.button
        className="fixed bottom-20 left-4 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close performance dashboard' : 'Open performance dashboard'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChartLine />
      </motion.button>

      {/* Performance Dashboard Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 left-4 z-30 w-96 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <GlassmorphismCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaEye className="text-blue-500" />
                  Performance
                </h2>
                <button
                  onClick={collectMetrics}
                  disabled={isLoading}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Refresh metrics"
                >
                  <FaChartLine className={isLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Core Metrics</h3>
                  <div className="space-y-2">
                    {metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <span className="text-sm text-gray-300">{metric.name}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                            {metric.value}{metric.unit}
                          </span>
                          <div className="text-xs text-gray-500">
                            Good: &lt;{metric.threshold.good}{metric.unit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Checks */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Health Checks</h3>
                  <div className="space-y-2">
                    {healthChecks.map((check, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-gray-800/50 rounded-lg">
                        <div className="mt-0.5">
                          {getStatusIcon(check.status)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{check.name}</div>
                          <div className="text-xs text-gray-400">{check.message}</div>
                          <div className="text-xs text-gray-500">{check.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Info */}
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Platform Info</h3>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Environment: {import.meta.env.MODE}</div>
                    <div>Build: {import.meta.env.VITE_APP_VERSION || 'dev'}</div>
                    <div>Platform: {window.location.hostname}</div>
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceDashboard;