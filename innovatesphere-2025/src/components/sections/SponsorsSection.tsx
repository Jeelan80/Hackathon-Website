import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaExternalLinkAlt, FaStar, FaAward, FaMedal } from 'react-icons/fa';

interface Sponsor {
  name: string;
  logo: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver';
  description?: string;
}

const SponsorsSection: React.FC = () => {
  const sponsors: Sponsor[] = [
    // Platinum Sponsors
    {
      name: 'TechCorp Global',
      logo: '/api/placeholder/200/100',
      website: 'https://techcorp.com',
      tier: 'platinum',
      description: 'Leading AI technology solutions provider'
    },
    {
      name: 'InnovateAI',
      logo: '/api/placeholder/200/100',
      website: 'https://innovateai.com',
      tier: 'platinum',
      description: 'Pioneering artificial intelligence research'
    },
    
    // Gold Sponsors
    {
      name: 'DataFlow Systems',
      logo: '/api/placeholder/180/90',
      website: 'https://dataflow.com',
      tier: 'gold',
      description: 'Big data and analytics platform'
    },
    {
      name: 'CloudTech Solutions',
      logo: '/api/placeholder/180/90',
      website: 'https://cloudtech.com',
      tier: 'gold',
      description: 'Cloud infrastructure and services'
    },
    {
      name: 'NextGen Robotics',
      logo: '/api/placeholder/180/90',
      website: 'https://nextgenrobotics.com',
      tier: 'gold',
      description: 'Advanced robotics and automation'
    },
    
    // Silver Sponsors
    {
      name: 'StartupHub',
      logo: '/api/placeholder/160/80',
      website: 'https://startuphub.com',
      tier: 'silver',
      description: 'Startup incubator and accelerator'
    },
    {
      name: 'DevTools Pro',
      logo: '/api/placeholder/160/80',
      website: 'https://devtools.com',
      tier: 'silver',
      description: 'Developer tools and platforms'
    },
    {
      name: 'AI Academy',
      logo: '/api/placeholder/160/80',
      website: 'https://aiacademy.com',
      tier: 'silver',
      description: 'AI education and training'
    },
    {
      name: 'CodeCraft',
      logo: '/api/placeholder/160/80',
      website: 'https://codecraft.com',
      tier: 'silver',
      description: 'Software development services'
    }
  ];

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return {
          title: 'Platinum Sponsors',
          icon: <FaStar className="w-6 h-6" />,
          gradient: 'from-gray-200 via-gray-300 to-gray-400',
          textColor: 'text-gray-300',
          borderColor: 'border-gray-300',
          bgGlow: 'bg-gray-300/10',
          logoSize: 'h-16 md:h-20'
        };
      case 'gold':
        return {
          title: 'Gold Sponsors',
          icon: <FaAward className="w-5 h-5" />,
          gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-400',
          bgGlow: 'bg-yellow-400/10',
          logoSize: 'h-12 md:h-16'
        };
      case 'silver':
        return {
          title: 'Silver Sponsors',
          icon: <FaMedal className="w-4 h-4" />,
          gradient: 'from-gray-400 via-gray-500 to-gray-600',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500',
          bgGlow: 'bg-gray-500/10',
          logoSize: 'h-10 md:h-12'
        };
      default:
        return {
          title: 'Sponsors',
          icon: <FaStar className="w-4 h-4" />,
          gradient: 'from-gray-500 to-gray-600',
          textColor: 'text-gray-500',
          borderColor: 'border-gray-500',
          bgGlow: 'bg-gray-500/10',
          logoSize: 'h-10'
        };
    }
  };

  const groupedSponsors = {
    platinum: sponsors.filter(s => s.tier === 'platinum'),
    gold: sponsors.filter(s => s.tier === 'gold'),
    silver: sponsors.filter(s => s.tier === 'silver')
  };

  const SponsorCard: React.FC<{ sponsor: Sponsor; index: number }> = ({ sponsor, index }) => {
    const tierConfig = getTierConfig(sponsor.tier);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="group"
      >
        <GlassmorphismCard 
          className={`p-6 text-center border-2 ${tierConfig.borderColor} ${tierConfig.bgGlow} 
            hover:border-opacity-80 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between`}
          glow
        >
          {/* Sponsor Logo */}
          <div className="flex-grow flex items-center justify-center mb-4">
            <div className={`${tierConfig.logoSize} flex items-center justify-center`}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=${encodeURIComponent(sponsor.name)}`;
                }}
              />
            </div>
          </div>

          {/* Sponsor Name */}
          <h3 className={`text-lg font-bold ${tierConfig.textColor} mb-2 group-hover:text-white transition-colors`}>
            {sponsor.name}
          </h3>

          {/* Description */}
          {sponsor.description && (
            <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
              {sponsor.description}
            </p>
          )}

          {/* External Link Icon */}
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaExternalLinkAlt className="text-gray-500 group-hover:text-primary-blue transition-colors text-sm" />
          </motion.div>
        </GlassmorphismCard>
      </motion.div>
    );
  };

  const SponsorTier: React.FC<{ tier: keyof typeof groupedSponsors; sponsors: Sponsor[] }> = ({ tier, sponsors }) => {
    const tierConfig = getTierConfig(tier);
    const gridCols = tier === 'platinum' ? 'md:grid-cols-2' : tier === 'gold' ? 'md:grid-cols-3' : 'md:grid-cols-4';

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        {/* Tier Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`p-3 rounded-full bg-gradient-to-r ${tierConfig.gradient} text-white`}>
              {tierConfig.icon}
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold ${tierConfig.textColor}`}>
              {tierConfig.title}
            </h3>
          </motion.div>
        </div>

        {/* Sponsors Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.name}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <SponsorCard sponsor={sponsor} index={index} />
            </a>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="sponsors" className="pt-16 md:pt-24 pb-4 px-8 bg-gradient-to-b from-black via-indigo-900/10 to-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Our Amazing Sponsors</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Powered by industry leaders who believe in innovation for social good
            </p>
            
            {/* Sponsor Count */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-3 glass-card px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <FaStar className="text-yellow-400" />
              <span className="text-lg font-semibold text-white">{sponsors.length} Amazing Partners</span>
            </motion.div>
          </motion.div>

          {/* Sponsor Tiers */}
          <div className="space-y-8">
            {/* Platinum Sponsors */}
            {groupedSponsors.platinum.length > 0 && (
              <SponsorTier tier="platinum" sponsors={groupedSponsors.platinum} />
            )}

            {/* Gold Sponsors */}
            {groupedSponsors.gold.length > 0 && (
              <SponsorTier tier="gold" sponsors={groupedSponsors.gold} />
            )}

            {/* Silver Sponsors */}
            {groupedSponsors.silver.length > 0 && (
              <SponsorTier tier="silver" sponsors={groupedSponsors.silver} />
            )}
          </div>

          {/* Become a Sponsor CTA */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="glass-card p-8 cursor-pointer group max-w-2xl mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <FaStar className="text-4xl text-yellow-400" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                  Want to Sponsor Us?
                </h4>
                <p className="text-lg text-gray-300 mb-6 group-hover:text-white transition-colors">
                  Join our mission to foster innovation and support the next generation of AI developers!
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold text-lg">Get in Touch</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaExternalLinkAlt className="text-lg" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;