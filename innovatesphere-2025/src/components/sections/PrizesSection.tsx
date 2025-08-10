import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaTrophy, 
  FaMedal, 
  FaAward,
  FaStar,
  FaCrown,
  FaGem
} from 'react-icons/fa';

const PrizesSection: React.FC = () => {
  const prizes = [
    {
      rank: 1,
      title: "Grand Prize",
      amount: "₹10,000",
      description: "Winner takes all! The most innovative AI solution for social good.",
      icon: <FaCrown className="w-8 h-8" />,
      gradient: "from-yellow-400 via-yellow-500 to-orange-500",
      glowColor: "shadow-yellow-500/50",
      borderColor: "border-yellow-400",
      bgGlow: "bg-yellow-500/10",
      features: [
        "Cash prize of ₹10,000",
        "Winner certificate",
        "LinkedIn feature",
        "Mentorship opportunity"
      ]
    },
    {
      rank: 2,
      title: "Second Place",
      amount: "₹5,000",
      description: "Outstanding innovation and execution in AI for social impact.",
      icon: <FaTrophy className="w-7 h-7" />,
      gradient: "from-gray-300 via-gray-400 to-gray-500",
      glowColor: "shadow-gray-400/50",
      borderColor: "border-gray-400",
      bgGlow: "bg-gray-400/10",
      features: [
        "Cash prize of ₹5,000",
        "Runner-up certificate",
        "LinkedIn recognition",
        "Industry connections"
      ]
    },
    {
      rank: 3,
      title: "Third Place",
      amount: "₹3,000",
      description: "Excellent effort in creating meaningful AI solutions.",
      icon: <FaMedal className="w-6 h-6" />,
      gradient: "from-amber-600 via-amber-700 to-orange-700",
      glowColor: "shadow-amber-600/50",
      borderColor: "border-amber-600",
      bgGlow: "bg-amber-600/10",
      features: [
        "Cash prize of ₹3,000",
        "Achievement certificate",
        "Portfolio showcase",
        "Community recognition"
      ]
    }
  ];

  const specialPrizes = [
    {
      title: "Best Innovation",
      description: "Most creative use of AI technology",
      icon: <FaGem className="w-5 h-5" />,
      reward: "Special Recognition"
    },
    {
      title: "Best Social Impact",
      description: "Solution with highest potential for social good",
      icon: <FaStar className="w-5 h-5" />,
      reward: "Impact Award"
    },
    {
      title: "Best Technical Implementation",
      description: "Most technically sound and well-executed solution",
      icon: <FaAward className="w-5 h-5" />,
      reward: "Technical Excellence"
    }
  ];

  return (
    <section id="prizes" className="section-padding px-8 bg-gradient-to-b from-black via-purple-900/20 to-black">
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
              <span className="gradient-text">Prizes & Recognition</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              ₹18,000 in total prizes for the most innovative AI solutions
            </p>
            
            {/* Total Prize Pool */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-3 glass-card px-8 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <FaTrophy className="text-yellow-400 text-xl" />
              <span className="text-2xl font-bold gradient-text">₹18,000 Prize Pool</span>
            </motion.div>
          </motion.div>

          {/* Main Prizes */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {prizes.map((prize, index) => (
              <motion.div
                key={prize.rank}
                variants={fadeInUp}
                className={`relative ${
                  prize.rank === 1 ? 'lg:scale-110 lg:-mt-8' : 
                  prize.rank === 2 ? '' : 
                  'lg:mt-8'
                }`}
                whileHover={{ 
                  scale: prize.rank === 1 ? 1.15 : 1.05, 
                  y: -10 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GlassmorphismCard 
                  className={`p-8 text-center relative overflow-hidden border-2 ${prize.borderColor} ${prize.bgGlow}`}
                  glow
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${prize.gradient} 
                    flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {prize.rank}
                  </div>

                  {/* Prize Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full 
                      bg-gradient-to-r ${prize.gradient} text-white mb-6 ${prize.glowColor} shadow-2xl`}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {prize.icon}
                  </motion.div>

                  {/* Prize Title */}
                  <h3 className={`text-2xl font-bold mb-2 ${
                    prize.rank === 1 ? 'text-yellow-400' : 
                    prize.rank === 2 ? 'text-gray-300' : 'text-amber-600'
                  }`}>
                    {prize.title}
                  </h3>

                  {/* Prize Amount */}
                  <div className={`text-4xl font-bold mb-4 bg-gradient-to-r ${prize.gradient} 
                    bg-clip-text text-transparent`}>
                    {prize.amount}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {prize.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {prize.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center justify-center gap-2 text-sm text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${prize.gradient}`} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Glow Effect for Grand Prize */}
                  {prize.rank === 1 && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-500/20 -z-10"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>

          {/* Special Recognition Prizes */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">
              Special Recognition Awards
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {specialPrizes.map((award, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <GlassmorphismCard className="p-6 text-center border border-primary-blue/30 hover:border-primary-blue/60 transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full 
                      bg-gradient-to-r from-primary-purple to-primary-blue text-white mb-4">
                      {award.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {award.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      {award.description}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-blue/20 
                      text-primary-blue text-xs font-medium">
                      {award.reward}
                    </span>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
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
                  <FaTrophy className="text-4xl text-yellow-400" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                  Ready to Win Big?
                </h4>
                <p className="text-lg text-gray-300 mb-6 group-hover:text-white transition-colors">
                  Build an AI solution that makes a difference and compete for amazing prizes!
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold text-lg">Start Building Your Solution</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaStar className="text-lg" />
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

export default PrizesSection;