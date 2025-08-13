import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Community', href: '#community' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Judges', href: '#judges' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId, 100, 800);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-1' : 'py-2'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-2 sm:px-4">
        <GlassmorphismCard 
          className={`transition-all duration-300 ${
            isScrolled ? 'backdrop-blur-lg bg-black/20' : 'backdrop-blur-md bg-white/5'
          }`}
        >
          <nav 
            className="flex items-center justify-between py-1 sm:py-2 px-2 sm:px-4 lg:px-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-1 min-w-0">
              {/* Organization Logos - Responsive Sizes */}
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
                <motion.img
                  src="/assets/Logos/Bti College Logo.png"
                  alt="BTI College Logo"
                  className="h-8 sm:h-12 md:h-16 lg:h-20 w-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.img
                  src="/assets/Logos/BTIIGNITE LOGO.png"
                  alt="BTI Ignite Logo"
                  className="h-8 sm:h-12 md:h-16 lg:h-20 w-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.img
                  src="/assets/Logos/CEO - BTIINGINE.png"
                  alt="BTI Engine CEO Logo"
                  className="h-8 sm:h-12 md:h-16 lg:h-20 w-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              {/* Separator */}
              <div className="hidden sm:block w-px h-8 sm:h-12 md:h-16 lg:h-20 bg-white/20 flex-shrink-0"></div>
              
              {/* Main Event Title - Responsive */}
              <motion.button
                className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold gradient-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded truncate"
                whileHover={{ scale: 1.05 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="HACKFINITY - Go to top of page"
              >
                HACKFINITY
              </motion.button>
            </div>

            {/* Professional Menu Button */}
            <motion.button
              className="relative p-2 sm:p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-black/60 transition-all duration-300 flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Toggle navigation menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </nav>

          {/* Professional Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/20 bg-black/90 backdrop-blur-xl"
              >
                <div className="py-4 px-6">
                  {/* Navigation Items - Clean List Style */}
                  <div className="space-y-1 mb-4">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Register Button - Minimal Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-3 border-t border-white/10"
                  >
                    <button
                      onClick={onRegisterClick}
                      className="w-full px-4 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                      Register Now
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassmorphismCard>
      </div>
    </motion.header>
  );
};

export default Header;