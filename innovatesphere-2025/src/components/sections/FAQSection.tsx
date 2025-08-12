import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { 
  FaChevronDown, 
  FaQuestionCircle,
  FaUsers,
  FaCode,
  FaTrophy,
  // FaClock, // TODO: Use for timing-related FAQs
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
      question: 'What is HACKFINITY?',
      answer: 'HACKFINITY is an 18-hour offline hackathon focused on building AI solutions for social good, taking place on August 22-23, 2025 at Bangalore Technological Institute (BTI). Participants work in teams to create innovative applications that address real-world social challenges using artificial intelligence.',
      category: 'general',
      icon: <FaQuestionCircle className="w-4 h-4" />
    },
    {
      id: '2',
      question: 'How do I register and what does it cost?',
      answer: 'Registration is simple! Click the "Register Now" button on our homepage and fill out the registration form. The registration fee is ₹1,499 per participant, which includes meals, venue access, swag, and participation in all activities. Payment is processed securely through Razorpay.',
      category: 'participation',
      icon: <FaHandshake className="w-4 h-4" />
    },
    {
      id: '3',
      question: 'What is the team size limit?',
      answer: 'Teams can have a maximum of 3 members. You can register as a solo participant or with a pre-formed team. Team member 1 is automatically the team leader. All team members must register and pay the ₹1,499 registration fee individually.',
      category: 'participation',
      icon: <FaUsers className="w-4 h-4" />
    },
    {
      id: '4',
      question: 'What are the submission requirements?',
      answer: 'Teams must submit their working solution with source code, a presentation explaining their project, and a demo. All submissions must be related to AI for social good and be original work created during the 18-hour hackathon period. Pre-existing libraries and APIs are allowed.',
      category: 'technical',
      icon: <FaCode className="w-4 h-4" />
    },
    {
      id: '5',
      question: 'What are the prizes and how much can I win?',
      answer: 'HACKFINITY offers a total prize pool of ₹18,000! Prizes are awarded based on innovation, technical implementation, social impact potential, and presentation quality. Winners will be announced at the closing ceremony and prizes distributed within 30 days.',
      category: 'prizes',
      icon: <FaTrophy className="w-4 h-4" />
    },
    {
      id: '6',
      question: 'What is included in the registration fee?',
      answer: 'The ₹1,499 registration fee includes: venue access for 18 hours, meals and refreshments, HACKFINITY swag kit, mentorship sessions, networking opportunities, and participation in all hackathon activities. This is a one-time fee per participant.',
      category: 'general',
      icon: <FaQuestionCircle className="w-4 h-4" />
    },
    {
      id: '7',
      question: 'Where and when is HACKFINITY taking place?',
      answer: 'HACKFINITY takes place on August 22-23, 2025 at Bangalore Technological Institute (BTI) campus in Bangalore. It\'s an 18-hour offline event where participants will work continuously to build their AI solutions for social good.',
      category: 'general',
      icon: <FaQuestionCircle className="w-4 h-4" />
    },
    {
      id: '8',
      question: 'Can I get a refund if I cannot attend?',
      answer: 'No, all registration fees are non-refundable once payment is collected. Refunds are only provided if the event is cancelled by the organizers. We recommend ensuring your availability before registering as personal circumstances do not qualify for refunds.',
      category: 'participation',
      icon: <FaHandshake className="w-4 h-4" />
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

  const FAQItem: React.FC<{ item: FAQItem; index: number }> = ({ item }) => {
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