import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard, AnimatedButton, DiscordButton } from '../ui';
import { ParallaxBackground } from '../animations';
import { EVENT_CONFIG } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { 
  FaRocket, 
  FaBook, 
  FaCode, 
  FaBrain, 
  FaRobot, 
  FaLightbulb,
  FaCog,
  FaDatabase,
  FaChartLine,
  FaGlobe
} from 'react-icons/fa';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Tech icons for floating animation
  const techIcons = [
    { icon: FaCode, color: '#4F46E5', delay: 0 },
    { icon: FaBrain, color: '#3B82F6', delay: 0.2 },
    { icon: FaRobot, color: '#8B5CF6', delay: 0.4 },
    { icon: FaLightbulb, color: '#F59E0B', delay: 0.6 },
    { icon: FaCog, color: '#10B981', delay: 0.8 },
    { icon: FaDatabase, color: '#EF4444', delay: 1.0 },
    { icon: FaChartLine, color: '#06B6D4', delay: 1.2 },
    { icon: FaGlobe, color: '#84CC16', delay: 1.4 }
  ];

  // Code snippets for background animation
  const codeSnippets = [
    'const ai = new Intelligence();',
    'function changeLives() { return impact; }',
    'if (innovation) { buildFuture(); }',
    'class SocialGood extends AI {}',
    'hackathon.solve(worldProblems);'
  ];

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10
  }));

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative hero-gradient min-h-screen flex items-center justify-center p-8 pt-24 md:pt-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Hero section - InnovateSphere 2025 hackathon introduction"
      role="banner"
    >
      {/* Interactive Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-blue rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {techIcons.map((tech, index) => {
          const Icon = tech.icon;
          const iconNames = ['Code', 'Brain', 'Robot', 'Lightbulb', 'Cog', 'Database', 'Chart', 'Globe'];
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${15 + (index % 4) * 20}%`,
                top: `${20 + Math.floor(index / 4) * 25}%`,
                color: tech.color
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 8 + index,
                repeat: Infinity,
                delay: tech.delay,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              role="img"
              aria-label={`Floating ${iconNames[index]} icon representing technology themes`}
            >
              <Icon className="text-3xl md:text-4xl" />
            </motion.div>
          );
        })}
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {codeSnippets.map((code, index) => (
          <motion.div
            key={index}
            className="absolute text-xs md:text-sm font-mono text-primary-blue/30"
            style={{
              left: `${10 + index * 18}%`,
              top: `${30 + (index % 2) * 40}%`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [20, -10, 20]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut"
            }}
            role="img"
            aria-label={`Floating code snippet: ${code}`}
          >
            {code}
          </motion.div>
        ))}
      </div>

      {/* Interactive Mouse Follower */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 0.6 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 blur-xl" />
      </motion.div>

      {/* Parallax Background Elements */}
      <ParallaxBackground 
        speed={0.3}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
          className="w-full h-full"
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
      </ParallaxBackground>

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
          <GlassmorphismCard className="p-8 md:p-12 text-center relative overflow-hidden" glow>
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  'linear-gradient(45deg, #4F46E5, #3B82F6)',
                  'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                  'linear-gradient(45deg, #8B5CF6, #4F46E5)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Main Headline with Staggered Animation */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 relative z-10"
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
                  whileHover={{ 
                    textShadow: '0 0 20px rgba(79, 70, 229, 0.5)',
                    scale: 1.05 
                  }}
                >
                  {EVENT_CONFIG.name}
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              variants={fadeInUp}
              className="mb-8 relative z-10"
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

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              className="mb-10 relative z-10"
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

            {/* Interactive Event Details Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base relative z-10"
            >
              {[
                { label: EVENT_CONFIG.eventType, delay: 1.0, icon: FaCode },
                { label: "August 23-24, 2025", delay: 1.1, icon: FaRocket },
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
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
                    }}
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
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
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
                whileHover={{ scale: 1.05 }}
              >
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  onClick={() => smoothScrollTo('about', 100, 800)}
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

            {/* Discord Community Button */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-8 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <DiscordButton size="lg" />
            </motion.div>
          </GlassmorphismCard>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Perfectly centered at bottom */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <motion.button
          className="flex flex-col items-center justify-center text-white/60 cursor-pointer mx-auto focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
          onClick={() => smoothScrollTo('about', 100, 800)}
          whileHover={{ scale: 1.1, color: '#ffffff' }}
          aria-label="Scroll down to explore more content about the hackathon"
          role="button"
        >
          <span className="text-sm mb-3 font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;