import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard, AnimatedButton } from '../ui';
import { EVENT_CONFIG } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { 
  FaRocket, 
  FaBook, 
  FaCode, 
  FaBrain, 
  FaChartLine,
  FaImage,
  FaTimes
} from 'react-icons/fa';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative hero-gradient min-h-screen flex items-center justify-center p-8 pt-24 md:pt-32"
      aria-label="Hero section - HACKFINITY hackathon introduction"
      role="banner"
    >

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <GlassmorphismCard className="p-8 md:p-12 text-center" glow>

            {/* Main Headline */}
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                aria-label={`${EVENT_CONFIG.name} - Main hackathon title`}
              >
                <motion.span 
                  className="gradient-text block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {EVENT_CONFIG.name}
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <h2 
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium"
                aria-label={`Event tagline: ${EVENT_CONFIG.tagline}`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {EVENT_CONFIG.tagline}
                </motion.span>
              </h2>
            </motion.div>

            {/* Organizer Information */}
            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <p 
                className="text-lg md:text-xl text-yellow-400 font-semibold"
                aria-label="Event organizer information"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Organized by: <span className="gradient-text font-bold">BTI IGNITE INCUBATION COUNCIL</span>
                </motion.span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              className="mb-10"
            >
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {EVENT_CONFIG.description}
                </motion.span>
              </p>
            </motion.div>

            {/* Event Details Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base"
            >
              {[
                { label: EVENT_CONFIG.eventType, delay: 1.0, icon: FaCode },
                { label: "August 22-23, 2025", delay: 1.1, icon: FaRocket },
                { label: EVENT_CONFIG.totalPrizes, delay: 1.2, icon: FaChartLine },
                { label: `${EVENT_CONFIG.duration} of Innovation`, delay: 1.3, icon: FaBrain }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="glass-button px-4 py-2 md:px-6 md:py-3 flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                  >
                    <Icon className="text-primary-blue" />
                    {item.label}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={onRegisterClick}
                  glow
                  className="px-8 py-4 text-lg font-semibold min-w-[200px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaRocket /> Register Now
                  </span>
                </AnimatedButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  onClick={() => smoothScrollTo('about', 100, 800)}
                  className="px-8 py-4 text-lg font-semibold min-w-[200px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaBook /> Learn More
                  </span>
                </AnimatedButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <button
                  onClick={() => setIsPosterOpen(true)}
                  className="px-8 py-4 text-lg font-semibold min-w-[200px] bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaImage /> Check Out Poster
                  </span>
                </button>
              </motion.div>
            </motion.div>


          </GlassmorphismCard>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Completely separate from card, positioned at section bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.button
            className="flex flex-col items-center justify-center text-white/70 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded-lg p-3 bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg"
            onClick={() => smoothScrollTo('about', 100, 800)}
            whileHover={{ scale: 1.1, color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll down to explore more content about the hackathon"
            role="button"
          >
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Poster Modal */}
      <AnimatePresence>
        {isPosterOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPosterOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPosterOpen(false)}
                className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-red-400 transition-colors duration-200"
                aria-label="Close poster"
              >
                <FaTimes className="w-8 h-8" />
              </button>

              {/* Poster Image */}
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/assets/Poster.jpg"
                  alt="HACKFINITY Event Poster"
                  className="w-full h-full object-contain max-h-[85vh]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMTExODI3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiBmaWxsPSIjNkI3Mjg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCI+UG9zdGVyIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+';
                  }}
                />
                
                {/* Gradient Overlay for Better Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none"></div>
              </div>

              {/* Download Button */}
              <div className="absolute bottom-4 right-4">
                <a
                  href="/assets/Poster.jpg"
                  download="HACKFINITY_Poster.jpg"
                  className="px-4 py-2 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;