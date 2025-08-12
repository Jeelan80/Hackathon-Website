/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{vue,html}",
    "./public/**/*.html"
  ],
  safelist: [
    // Preserve dynamic classes that might be purged
    'bg-gradient-to-r',
    'from-purple-600',
    'to-blue-600',
    'from-primary-purple',
    'to-primary-blue',
    'glassmorphism',
    'glassmorphism-light',
    'glassmorphism-dark',
    'glow-purple',
    'glow-blue',
    'glow-purple-strong',
    'animate-glow',
    'animate-float',
    'animate-pulse-glow',
    'high-contrast',
    'reduce-motion',
    'font-size-normal',
    'font-size-large',
    'font-size-extra-large',
    // Dynamic responsive classes
    'sm:text-lg',
    'md:text-xl',
    'lg:text-2xl',
    'xl:text-3xl',
    // Animation classes that might be applied dynamically
    /^animate-/,
    /^glassmorphism-/,
    /^glow-/,
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#4F46E5',
          blue: '#3B82F6',
          black: '#000000',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(79, 70, 229, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(79, 70, 229, 0.8)',
            transform: 'scale(1.05)'
          },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glassmorphism': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glassmorphism-light': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glassmorphism-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glow-purple': {
          boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)',
        },
        '.glow-blue': {
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        },
        '.glow-purple-strong': {
          boxShadow: '0 0 40px rgba(79, 70, 229, 0.6)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}