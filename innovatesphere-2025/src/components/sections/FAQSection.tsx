import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { 
  FaChevronDown, 
  FaQuestionCircle,
  FaUsers,
  FaCode,
  FaTrophy,
  FaClock,
  FaHandshake
} from 'react-icons/fa';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'participation' | 'technical' | 'prizes';
  icon: React.ReactNode;
}

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'What is InnovateSphere 2025?',
      answer: 'InnovateSphere 2025 is a 18-hour virtual hackathon focused on building AI solutions for social good. Participants will work in teams to create innovative applications that address real-world social challenges using artificial intelligence.',
      category: 'general',
      icon: <FaQuestionCircle className="w-4 h-4" />
    },
    {
      id: '2',
      question: 'How do I register for the hackathon?',
      answer: 'Registration is simple! Click the "Register Now" button on our homepage and fill out the registration form. You can register as an individual or with a pre-formed team. Registration is free and open to all skill levels.',
      category: 'participation',
      icon: <FaHandshake className="w-4 h-4" />
    },
    {
      id: '3',
      question: 'What is the team size limit?',
      answer: 'Teams can have 2-4 members. You can register individually and we\'ll help you find teammates during the team formation session, or you can register with a pre-formed team. Solo participation is also allowed but we encourage collaboration.',
      category: 'participation',
      icon: <FaUsers className="w-4 h-4" />
    },
    {
      id: '4',
      question: 'What are the submission requirements?',
      answer: 'Teams must submit their working solution, source code (GitHub repository), a presentation deck (PPT/PDF), and a demo video (max 3 minutes). All submissions must be related to AI for social good and be original work created during the hackathon.',
      category: 'technical',
      icon: <FaCode className="w-4 h-4" />
    },
    {
      id: '5',
      question: 'Is there any cost to participate?',
      answer: 'No! InnovateSphere 2025 is completely free to participate. We believe in making innovation accessible to everyone. All you need is your creativity, coding skills, and passion for social good.',
      category: 'general',
      icon: <FaQuestionCircle className="w-4 h-4" />
    },
    {
      id: '6',
      question: 'What are the judging criteria?',
      answer: 'Projects will be judged on: Innovation & Creativity (25%), Social Impact Potential (25%), Technical Implementation (25%), and Presentation Quality (25%). Our expert judges will evaluate both the technical excellence and the potential for positive social change.',
      category: 'prizes',
      icon: <FaTrophy className="w-4 h-4" />
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', count: faqItems.length },
    { id: 'general', label: 'General', count: faqItems.filter(item => item.category === 'general').length },
    { id: 'participation', label: 'Participation', count: faqItems.filter(item => item.category === 'participation').length },
    { id: 'technical', label: 'Technical', count: faqItems.filter(item => item.category === 'technical').length },
    { id: 'prizes', label: 'Prizes & Judging', count: faqItems.filter(item => item.category === 'prizes').length }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const FAQItem: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
    const isOpen = openItems.includes(item.id);

    return (
      <div className="mb-3">
        <GlassmorphismCard className="overflow-hidden border border-white/10 hover:border-primary-blue/50 transition-colors">
          <motion.button
            onClick={() => toggleItem(item.id)}
            className="w-full p-4 text-left flex items-center justify-between group"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 flex-grow">
              <div className="text-primary-blue group-hover:text-primary-purple transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-primary-blue transition-colors">
                {item.question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 group-hover:text-white transition-colors ml-4"
            >
              <FaChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0">
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassmorphismCard>
      </div>
    );
  };

  return (
    <section id="faq" className="py-8 px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers!
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white shadow-lg'
                    : 'glass-button text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredFAQs.map((item, index) => (
                <FAQItem key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;