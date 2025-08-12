import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaGraduationCap, 
  FaStore, 
  FaHandsHelping, 
  FaRobot,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaUsers,
  FaCog
} from 'react-icons/fa';

interface Theme {
  id: string;
  title: string;
  shortDescription: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
  realImpact: string[];
  whyChosen: string[];
}

const ThemesSection: React.FC = () => {
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  const themes: Theme[] = [
    {
      id: 'campus',
      title: 'Campus & College Life Solutions',
      shortDescription: 'Innovate for your own campus — solve the daily challenges students, faculty, and events face.',
      icon: <FaGraduationCap className="text-3xl" />,
      color: 'from-blue-500 to-purple-600',
      examples: [
        'Smart Canteen Ordering System with live queue tracking',
        'Classroom Resource Booking App for labs and projectors',
        'Event Photo Sharing Hub using AI-based face grouping'
      ],
      realImpact: [
        'Makes everyday campus life smoother and more efficient',
        'Builds tools you and your peers can immediately start using'
      ],
      whyChosen: [
        'Every participant understands campus problems firsthand',
        'Perfect testing ground for real-world deployment in a controlled environment'
      ]
    },
    {
      id: 'business',
      title: 'Local Small Business Helpers',
      shortDescription: 'Empower neighborhood shops, cafes, and freelancers with smart yet simple tech.',
      icon: <FaStore className="text-3xl" />,
      color: 'from-green-500 to-teal-600',
      examples: [
        'Offline-first POS system for rural areas',
        'Automated Menu Translator for restaurants',
        'Smart Shelf Restocking Tracker using low-cost sensors'
      ],
      realImpact: [
        'Directly supports small entrepreneurs and local economy',
        'Bridges the tech gap for non-digital businesses'
      ],
      whyChosen: [
        'Students can create something useful for real customers',
        'Impact can be seen and measured right after the hackathon'
      ]
    },
    {
      id: 'community',
      title: 'Community Service & NGO Tools',
      shortDescription: 'Design tools that make it easier for communities and NGOs to help people.',
      icon: <FaHandsHelping className="text-3xl" />,
      color: 'from-pink-500 to-red-600',
      examples: [
        'Real-Time Food Surplus Map for NGOs',
        'Micro-donation Round-Up App',
        'Volunteer Skill Matcher for community projects'
      ],
      realImpact: [
        'Improves how charities and community groups operate',
        'Enables efficient use of limited resources'
      ],
      whyChosen: [
        'Inspires participants by giving a social purpose to their skills',
        'Creates solutions that can be adopted by local NGOs quickly'
      ]
    },
    {
      id: 'automation',
      title: 'Daily Life Automation Tools',
      shortDescription: 'Automate repetitive daily tasks to save time and make life simpler.',
      icon: <FaRobot className="text-3xl" />,
      color: 'from-orange-500 to-yellow-600',
      examples: [
        'Shared Grocery List with auto-categorization',
        'Appliance Energy Tracker with cost estimation',
        'Neighborhood Carpool Matchmaker'
      ],
      realImpact: [
        'Helps individuals and families reduce wasted time and effort',
        'Makes technology part of everyday convenience'
      ],
      whyChosen: [
        'Direct personal benefit — creators can use what they build',
        'Great space for IoT, mobile, and AI-lite solutions'
      ]
    }
  ];

  const toggleTheme = (themeId: string) => {
    setExpandedTheme(expandedTheme === themeId ? null : themeId);
  };

  const ThemeCard: React.FC<{ theme: Theme; index: number }> = ({ theme, index }) => {
    const isExpanded = expandedTheme === theme.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <GlassmorphismCard className="overflow-hidden border border-white/10 hover:border-primary-blue/50 transition-all duration-300">
          {/* Card Header */}
          <motion.div
            onClick={() => toggleTheme(theme.id)}
            className="p-6 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-grow">
                {/* Icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-r ${theme.color} text-white shadow-lg`}>
                  {theme.icon}
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-blue transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {theme.shortDescription}
                  </p>
                </div>
              </div>
              
              {/* Expand/Collapse Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 hover:text-white transition-colors ml-4 mt-2"
              >
                {isExpanded ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
              </motion.div>
            </div>
          </motion.div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-white/10 pt-6 space-y-6">
                    
                    {/* Examples Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaLightbulb className="text-yellow-400" />
                        <h4 className="text-lg font-semibold text-white">Examples</h4>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                          For understanding only
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {theme.examples.map((example, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start gap-2">
                            <span className="text-primary-blue mt-1">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Real Impact Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaCog className="text-green-400" />
                        <h4 className="text-lg font-semibold text-white">Real Impact</h4>
                      </div>
                      <ul className="space-y-2">
                        {theme.realImpact.map((impact, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why We Chose This Theme */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaUsers className="text-purple-400" />
                        <h4 className="text-lg font-semibold text-white">Why We Chose This Theme</h4>
                      </div>
                      <ul className="space-y-2">
                        {theme.whyChosen.map((reason, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start gap-2">
                            <span className="text-purple-400 mt-1">→</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassmorphismCard>
      </motion.div>
    );
  };

  return (
    <section id="themes" className="section-padding px-8 bg-gradient-to-b from-black via-gray-900/50 to-black">
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
              <span className="gradient-text">Hackathon Themes</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore real-world problems and create solutions that can be deployed tomorrow.
            </p>
          </motion.div>

          {/* Themes Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {themes.map((theme, index) => (
              <ThemeCard key={theme.id} theme={theme} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <div className="glass-card p-6 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-gray-300 mb-6">
                Choose a theme that resonates with you and start creating solutions that matter. 
                Remember, these are just starting points — your creativity defines the final solution!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-primary-blue/20 text-primary-blue px-3 py-1 rounded-full">
                  Real-world Impact
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                  Immediate Deployment
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
                  Social Good Focus
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThemesSection;