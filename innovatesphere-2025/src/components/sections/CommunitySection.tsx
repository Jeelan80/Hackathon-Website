import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard, DiscordButton } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaDiscord, 
  FaUsers, 
  FaComments, 
  FaHandsHelping,
  FaLightbulb,
  FaCode,
  FaHeart
} from 'react-icons/fa';

const CommunitySection: React.FC = () => {
  const communityFeatures = [
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Connect with Innovators",
      description: "Meet like-minded developers, designers, and entrepreneurs passionate about AI for social good."
    },
    {
      icon: <FaComments className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Get instant notifications about schedule changes, announcements, and important hackathon updates."
    },
    {
      icon: <FaHandsHelping className="w-6 h-6" />,
      title: "Find Your Team",
      description: "Looking for teammates? Our Discord channels help you find the perfect collaborators for your project."
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Share Ideas",
      description: "Brainstorm, get feedback, and refine your ideas with the community before and during the hackathon."
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      title: "Technical Support",
      description: "Stuck on a problem? Our mentors and community members are ready to help you overcome challenges."
    },
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Post-Event Network",
      description: "Stay connected after the hackathon to continue collaborating and building meaningful relationships."
    }
  ];

  const stats = [
    { number: "500+", label: "Community Members" },
    { number: "24/7", label: "Active Support" },
    { number: "50+", label: "Mentors Available" },
    { number: "100%", label: "Inclusive Environment" }
  ];

  return (
    <section id="community" className="section-padding px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <FaDiscord className="text-4xl text-indigo-400" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Join Our Community</span>
              </h2>
            </motion.div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Connect, collaborate, and create with fellow innovators in our vibrant Discord community
            </p>
            
            {/* Main Discord CTA */}
            <motion.div
              variants={fadeInUp}
              className="mb-12"
            >
              <DiscordButton size="lg" className="text-xl px-10 py-5" />
            </motion.div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="p-6 text-center group cursor-pointer">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 text-sm md:text-base group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Community Features Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GlassmorphismCard className="p-6 h-full group cursor-pointer" glow>
                  <motion.div
                    className="text-indigo-400 mb-4 group-hover:text-purple-400 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <GlassmorphismCard className="p-8 max-w-4xl mx-auto" glow>
              <div className="mb-6">
                <FaDiscord className="text-6xl text-indigo-400 mx-auto" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to be part of something amazing?
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of innovators, get exclusive updates, find your dream team, 
                and be the first to know about exciting opportunities in our community.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <DiscordButton size="lg" />
                <motion.a
                  href="mailto:hello@innovatesphere.com"
                  className="glass-card px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 rounded-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;