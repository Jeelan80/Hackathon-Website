import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard, AnimatedButton } from '../ui';
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
        isScrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4">
        <GlassmorphismCard 
          className={`transition-all duration-300 ${
            isScrolled ? 'backdrop-blur-lg bg-black/20' : 'backdrop-blur-md bg-white/5'
          }`}
        >
          <nav 
            className="flex items-center justify-between py-3 px-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <motion.button
              className="text-xl font-bold gradient-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="HACKFINITY - Go to top of page"
            >
              HACKFINITY
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <AnimatedButton
                variant="primary"
                size="sm"
                onClick={onRegisterClick}
                glow
              >
                Register Now
              </AnimatedButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-white/10"
              >
                <div className="py-4 px-6 space-y-4">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 py-2"
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-4">
                    <AnimatedButton
                      variant="primary"
                      size="md"
                      onClick={onRegisterClick}
                      glow
                      className="w-full"
                    >
                      Register Now
                    </AnimatedButton>
                  </div>
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