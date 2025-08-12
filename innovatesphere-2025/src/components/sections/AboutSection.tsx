import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
// import { FadeInOnScroll } from '../animations'; // TODO: Use this for enhanced animations
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaRobot, FaUsers, FaGlobeAmericas, FaBullseye } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">About the Hackathon</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Where innovation meets purpose. Build AI solutions that make a real difference in the world.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <GlassmorphismCard className="p-8 h-full" glow>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center">
                      <FaRobot className="text-2xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI for Social Good</h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    InnovateSphere 2025 is more than just a hackathon—it's a movement. We're bringing together 
                    the brightest minds in technology to tackle the world's most pressing challenges using 
                    artificial intelligence.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    From healthcare accessibility to climate change, from education equity to social justice—
                    your code can be the catalyst for meaningful change. Join us for 18 hours of intense 
                    innovation, collaboration, and impact.
                  </p>

                  <div className="pt-4">
                    <div className="flex items-center gap-3 text-primary-blue">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="font-semibold">18 hours of non-stop innovation</span>
                    </div>
                  </div>
                </div>
              </GlassmorphismCard>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {[
                { number: "500+", label: "Expected Participants", icon: <FaUsers className="text-3xl text-primary-blue" /> },
                { number: "₹18K", label: "Total Prize Pool", icon: <RiMoneyDollarCircleFill className="text-3xl text-primary-blue" /> },
                { number: "24/7", label: "Mentor Support", icon: <FaBullseye className="text-3xl text-primary-blue" /> },
                { number: "Global", label: "Virtual Event", icon: <FaGlobeAmericas className="text-3xl text-primary-blue" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassmorphismCard className="p-6">
                    <div className="flex items-center gap-4">
                      <div>{stat.icon}</div>
                      <div>
                        <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                        <div className="text-gray-300 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;