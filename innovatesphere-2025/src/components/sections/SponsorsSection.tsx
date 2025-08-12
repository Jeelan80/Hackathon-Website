import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const SponsorsSection: React.FC = () => {

  return (
    <section id="sponsors" className="pt-16 md:pt-24 pb-4 px-8 bg-gradient-to-b from-black via-indigo-900/10 to-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Become a Sponsor CTA */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="glass-card p-12 cursor-pointer group max-w-2xl mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <FaStar className="text-5xl text-yellow-400" />
                </motion.div>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:gradient-text transition-all">
                  Want to Sponsor Us?
                </h4>
                <p className="text-xl text-gray-300 mb-8 group-hover:text-white transition-colors leading-relaxed">
                  Join our mission to foster innovation and support the next generation of AI developers!
                </p>
                <div className="flex items-center justify-center gap-3 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold text-xl">Get in Touch</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaExternalLinkAlt className="text-xl" />
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