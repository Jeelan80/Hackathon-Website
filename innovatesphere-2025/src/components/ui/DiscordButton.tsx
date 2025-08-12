import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';

interface DiscordButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = "inline-flex items-center gap-3 font-semibold rounded-xl transition-all duration-300 group";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25",
    secondary: "glass-card text-white hover:bg-white/10 border border-white/20 hover:border-purple-400/50"
  };

  return (
    <motion.a
      href="https://discord.gg/innovatesphere"
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FaDiscord className="text-xl group-hover:text-white transition-colors" />
      <span className="group-hover:text-white transition-colors">
        Join our Discord
      </span>
    </motion.a>
  );
};

export default DiscordButton;