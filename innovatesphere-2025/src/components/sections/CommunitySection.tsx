import React from 'react';
import { motion } from 'framer-motion';
import { DiscordButton } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaDiscord } from 'react-icons/fa';

const CommunitySection: React.FC = () => {

  return (
    <section id="community" className="section-padding px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Simple Discord Join Section */}
          <motion.div variants={fadeInUp} className="text-center">
            <motion.div
              className="inline-flex items-center gap-4 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <FaDiscord className="text-5xl text-indigo-400" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Join Our Community</span>
              </h2>
            </motion.div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Connect, collaborate, and create with fellow innovators in our vibrant Discord community
            </p>
            
            {/* Discord Button */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DiscordButton size="lg" className="text-xl px-12 py-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;