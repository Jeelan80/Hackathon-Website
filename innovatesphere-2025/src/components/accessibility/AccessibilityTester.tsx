import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { accessibilityTesting } from '../../utils/accessibility';
import { 
  FaCheck, 
  FaExclamationTriangle, 
  FaEye, 
  FaKeyboard,
  FaVolumeUp,
  FaSync
} from 'react-icons/fa';

interface AccessibilityIssue {
  category: string;
  issues: string[];
}

const AccessibilityTester: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<AccessibilityIssue[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  const runAccessibilityTests = async () => {
    setIsRunning(true);
    
    // Simulate async testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const results = accessibilityTesting.runAllChecks();
    setTestResults(results);
    setLastRunTime(new Date());
    setIsRunning(false);
  };

  useEffect(() => {
    if (isOpen && testResults.length === 0) {
      runAccessibilityTests();
    }
  }, [isOpen]);

  const totalIssues = testResults.reduce((sum, result) => sum + result.issues.length, 0);
  const hasIssues = totalIssues > 0;

  return (
    <>
      {/* Accessibility Tester Toggle - Only show in development */}
      {import.meta.env.DEV && (
        <motion.button
          className="fixed bottom-4 right-4 z-40 p-3 bg-yellow-600 text-white rounded-full shadow-lg hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close accessibility tester' : 'Open accessibility tester'}
          aria-expanded={isOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaEye />
        </motion.button>
      )}

      {/* Accessibility Tester Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-30 w-96 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <GlassmorphismCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaEye className="text-yellow-500" />
                  A11y Tester
                </h2>
                <button
                  onClick={runAccessibilityTests}
                  disabled={isRunning}
                  className="p-2 bg-primary-blue text-white rounded-lg hover:bg-primary-purple transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Run accessibility tests"
                >
                  <FaSync className={isRunning ? 'animate-spin' : ''} />
                </button>
              </div>

              {isRunning && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto mb-2"></div>
                  <p className="text-gray-300">Running accessibility tests...</p>
                </div>
              )}

              {!isRunning && testResults.length > 0 && (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className={`p-3 rounded-lg ${hasIssues ? 'bg-red-900/30 border border-red-500' : 'bg-green-900/30 border border-green-500'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {hasIssues ? (
                        <FaExclamationTriangle className="text-red-400" />
                      ) : (
                        <FaCheck className="text-green-400" />
                      )}
                      <span className="font-semibold text-white">
                        {hasIssues ? `${totalIssues} Issues Found` : 'All Tests Passed'}
                      </span>
                    </div>
                    {lastRunTime && (
                      <p className="text-xs text-gray-400">
                        Last run: {lastRunTime.toLocaleTimeString()}
                      </p>
                    )}
                  </div>

                  {/* Test Results */}
                  {testResults.map((result, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          {result.category === 'Images' && <FaEye className="text-blue-400" />}
                          {result.category === 'Forms' && <FaKeyboard className="text-green-400" />}
                          {result.category === 'Buttons' && <FaVolumeUp className="text-purple-400" />}
                          {result.category}
                        </h3>
                        <span className={`text-sm px-2 py-1 rounded ${
                          result.issues.length === 0 
                            ? 'bg-green-900/30 text-green-400' 
                            : 'bg-red-900/30 text-red-400'
                        }`}>
                          {result.issues.length === 0 ? 'Pass' : `${result.issues.length} issues`}
                        </span>
                      </div>

                      {result.issues.length > 0 && (
                        <div className="space-y-1">
                          {result.issues.slice(0, 3).map((issue, issueIndex) => (
                            <p key={issueIndex} className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
                              {issue}
                            </p>
                          ))}
                          {result.issues.length > 3 && (
                            <p className="text-xs text-gray-500 italic">
                              +{result.issues.length - 3} more issues...
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Quick Tips */}
                  <div className="border border-blue-700 rounded-lg p-3 bg-blue-900/20">
                    <h3 className="font-semibold text-blue-400 mb-2">Quick Tips</h3>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Add alt text to all images</li>
                      <li>• Use proper heading hierarchy (h1 → h2 → h3)</li>
                      <li>• Label all form inputs</li>
                      <li>• Ensure buttons have accessible names</li>
                      <li>• Test with keyboard navigation</li>
                    </ul>
                  </div>
                </div>
              )}
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityTester;