import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaLightbulb, 
  FaTrophy, 
  FaUsers, 
  FaGraduationCap, 
  FaBriefcase, 
  FaHeart,
  FaRocket 
} from 'react-icons/fa';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-primary-blue" />,
      title: "Solve Real Problems",
      description: "Work on challenges that matter. Build solutions for healthcare, education, climate change, and social justice using cutting-edge AI technology."
    },
    {
      icon: <FaTrophy className="w-8 h-8 text-primary-blue" />,
      title: "Win Amazing Prizes",
      description: "Compete for ₹18,000 in total prizes including a ₹10,000 grand prize, plus recognition and opportunities with our sponsor companies."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-primary-blue" />,
      title: "Network & Collaborate",
      description: "Connect with like-minded innovators, industry experts, and potential co-founders. Build relationships that last beyond the hackathon."
    },
    {
      icon: <FaGraduationCap className="w-8 h-8 text-primary-blue" />,
      title: "Learn & Grow",
      description: "Access workshops, mentorship sessions, and resources from industry leaders. Expand your skills in AI, machine learning, and social impact."
    },
    {
      icon: <FaBriefcase className="w-8 h-8 text-primary-blue" />,
      title: "Get Hired",
      description: "Showcase your skills to top tech companies. Many participants have landed internships and full-time positions through hackathon connections."
    },
    {
      icon: <FaHeart className="w-8 h-8 text-primary-blue" />,
      title: "Make an Impact",
      description: "Create solutions that can genuinely improve lives. Your project could be the next breakthrough in social good technology."
    }
  ];

  return (
    <section className="section-padding px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Why Participate?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join InnovateSphere 2025 and unlock opportunities that go far beyond coding
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <Card
                  title={benefit.title}
                  icon={benefit.icon}
                  glow
                  className="h-full group cursor-pointer"
                >
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {benefit.description}
                  </p>
                  
                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-purple/10 to-primary-blue/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="glass-card p-6 cursor-pointer group">
                <p className="text-lg text-gray-300 mb-4 group-hover:text-white transition-colors">
                  Ready to make your mark on the world?
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold">Join the Innovation</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaRocket className="text-lg" />
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

export default BenefitsSection;