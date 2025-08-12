// Framer Motion animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const scaleOnHover = {
  whileHover: { opacity: 0.9 },
  whileTap: { opacity: 0.8 },
  transition: { duration: 0.2, ease: "easeOut" }
};

export const glowOnHover = {
  whileHover: { 
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)'
  },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const slideInFromTop = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(79, 70, 229, 0.4)',
      '0 0 40px rgba(79, 70, 229, 0.8)',
      '0 0 20px rgba(79, 70, 229, 0.4)'
    ],
    scale: [1, 1.05, 1]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};