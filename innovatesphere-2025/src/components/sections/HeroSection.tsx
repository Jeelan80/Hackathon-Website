import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard, AnimatedButton } from '../ui';
import { EVENT_CONFIG } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaRocket, FaBook } from 'react-icons/fa';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  // Floating shapes animation variants
  const floatingShapes = [
    {
      initial: { x: -100, y: -100, rotate: 0, opacity: 0.3 },
      animate: { 
        x: [-100, 100, -50, 150, -100], 
        y: [-100, -50, -150, -80, -100],
        rotate: [0, 180, 360, 180, 0],
        opacity: [0.3, 0.6, 0.4, 0.7, 0.3]
      },
      transition: { duration: 20, repeat: Infinity, ease: "linear" as const }
    },
    {
      initial: { x: 200, y: 100, rotate: 45, opacity: 0.2 },
      animate: { 
        x: [200, -100, 150, -50, 200], 
        y: [100, 200, 50, 150, 100],
        rotate: [45, 225, 405, 225, 45],
        opacity: [0.2, 0.5, 0.3, 0.6, 0.2]
      },
      transition: { duration: 25, repeat: Infinity, ease: "linear" as const }
    },
    {
      initial: { x: -50, y: 200, rotate: 90, opacity: 0.4 },
      animate: { 
        x: [-50, 100, -150, 50, -50], 
        y: [200, 50, 180, 20, 200],
        rotate: [90, 270, 450, 270, 90],
        opacity: [0.4, 0.7, 0.3, 0.8, 0.4]
      },
      transition: { duration: 30, repeat: Infinity, ease: "linear" as const }
    }
  ];

  return (
    <section id="hero" className="relative hero-gradient min-h-screen flex items-center justify-center p-8 pt-24 md:pt-32 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute w-32 h-32 rounded-full opacity-20"
            style={{
              background: index % 2 === 0 
                ? 'linear-gradient(135deg, #4F46E5, #3B82F6)' 
                : 'linear-gradient(135deg, #3B82F6, #4F46E5)',
              filter: 'blur(40px)',
            }}
            initial={shape.initial}
            animate={shape.animate}
            transition={shape.transition}
          />
        ))}
      </div>

      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Radial Glow */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <GlassmorphismCard className="p-8 md:p-12 text-center" glow>
          {/* Main Headline with Staggered Animation */}
          <motion.div
            variants={fadeInUp}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
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

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {EVENT_CONFIG.tagline}
              </motion.span>
            </h2>
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
              { label: EVENT_CONFIG.eventType, delay: 1.0 },
              { label: "August 23-24, 2025", delay: 1.1 },
              { label: EVENT_CONFIG.totalPrizes, delay: 1.2 },
              { label: `${EVENT_CONFIG.duration} of Innovation`, delay: 1.3 }
            ].map((item, index) => (
              <motion.span
                key={index}
                className="glass-button px-4 py-2 md:px-6 md:py-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {item.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-20"
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
                <motion.span
                  className="flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaRocket /> Register Now
                </motion.span>
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
                onClick={() => {
                  const aboutSection = document.querySelector('#about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-lg font-semibold min-w-[200px]"
              >
                <motion.span
                  className="flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBook /> Learn More
                </motion.span>
              </AnimatedButton>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator - Moved outside the card */}
        </GlassmorphismCard>

      </motion.div>

      {/* Scroll Indicator - Perfectly centered at bottom */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
            <motion.div
              className="flex flex-col items-center justify-center text-white/60 cursor-pointer mx-auto"
              onClick={() => {
                const aboutSection = document.querySelector('#about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.1, color: '#ffffff' }}
            >
              <span className="text-sm mb-3 font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
    </section>
  );
};

export default HeroSection;