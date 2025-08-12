import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { useAccessibility } from '../../hooks';
import { 
  FaUniversalAccess, 
  FaTextHeight, 
  FaAdjust, 
  FaKeyboard,
  FaTimes,
  FaExpand
} from 'react-icons/fa';

const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updateFontSize, shouldReduceMotion } = useAccessibility();

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleReducedMotion = () => {
    document.documentElement.classList.toggle('reduce-motion');
  };

  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary-blue text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
      >
        Skip to main content
      </a>

      {/* Accessibility toolbar toggle */}
      <motion.button
        className="fixed top-4 right-4 z-40 p-3 bg-primary-blue text-white rounded-full shadow-lg hover:bg-primary-purple transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close accessibility toolbar' : 'Open accessibility toolbar'}
        aria-expanded={isOpen}
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaUniversalAccess />}
      </motion.button>

      {/* Accessibility toolbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-20 right-4 z-30 w-80"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <GlassmorphismCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaUniversalAccess className="text-primary-blue" />
                Accessibility Options
              </h2>

              <div className="space-y-4">
                {/* Font Size Controls */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaTextHeight className="inline mr-2" />
                    Font Size
                  </label>
                  <div className="flex gap-2">
                    {(['normal', 'large', 'extra-large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateFontSize(size)}
                        className={`px-3 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                          preferences.fontSize === size
                            ? 'bg-primary-blue text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        aria-pressed={preferences.fontSize === size}
                      >
                        {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div>
                  <button
                    onClick={toggleHighContrast}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    aria-describedby="high-contrast-desc"
                  >
                    <span className="flex items-center gap-2">
                      <FaAdjust />
                      High Contrast Mode
                    </span>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </div>
                  </button>
                  <p id="high-contrast-desc" className="text-xs text-gray-400 mt-1">
                    Increases contrast for better visibility
                  </p>
                </div>

                {/* Reduced Motion Toggle */}
                <div>
                  <button
                    onClick={toggleReducedMotion}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    aria-describedby="reduced-motion-desc"
                  >
                    <span className="flex items-center gap-2">
                      <FaExpand />
                      Reduce Motion
                    </span>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </div>
                  </button>
                  <p id="reduced-motion-desc" className="text-xs text-gray-400 mt-1">
                    Reduces animations and motion effects
                  </p>
                </div>

                {/* Keyboard Navigation Help */}
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FaKeyboard />
                    Keyboard Navigation
                  </h3>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p><kbd className="bg-gray-700 px-1 rounded">Tab</kbd> - Navigate forward</p>
                    <p><kbd className="bg-gray-700 px-1 rounded">Shift+Tab</kbd> - Navigate backward</p>
                    <p><kbd className="bg-gray-700 px-1 rounded">Enter/Space</kbd> - Activate buttons</p>
                    <p><kbd className="bg-gray-700 px-1 rounded">Esc</kbd> - Close modals</p>
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

export default AccessibilityToolbar;