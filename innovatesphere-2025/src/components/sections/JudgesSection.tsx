import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaPlay,
  FaPause
} from 'react-icons/fa';

interface Person {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  bio: string;
  expertise: string[];
}

const JudgesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'judges' | 'mentors'>('judges');

  const judges: Person[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'AI Research Director',
      company: 'Google DeepMind',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
      bio: 'Leading AI researcher with 15+ years in machine learning and social impact applications.',
      expertise: ['Machine Learning', 'Social Impact AI', 'Ethics in AI']
    },
    {
      id: '2',
      name: 'Raj Patel',
      title: 'CTO & Co-founder',
      company: 'TechForGood Inc',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/rajpatel',
      github: 'https://github.com/rajpatel',
      bio: 'Serial entrepreneur focused on building technology solutions for social challenges.',
      expertise: ['Startup Strategy', 'Product Development', 'Social Entrepreneurship']
    },
    {
      id: '3',
      name: 'Prof. Maria Rodriguez',
      title: 'Professor of Computer Science',
      company: 'MIT',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/mariarodriguez',
      bio: 'Academic leader in AI ethics and responsible technology development.',
      expertise: ['AI Ethics', 'Computer Vision', 'Academic Research']
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'VP of Engineering',
      company: 'Microsoft AI',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim',
      bio: 'Engineering leader with expertise in scaling AI systems for global impact.',
      expertise: ['AI Infrastructure', 'Cloud Computing', 'Team Leadership']
    }
  ];

  const mentors: Person[] = [
    {
      id: '5',
      name: 'Alex Thompson',
      title: 'Senior ML Engineer',
      company: 'OpenAI',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/alexthompson',
      github: 'https://github.com/alexthompson',
      bio: 'ML engineer passionate about democratizing AI and mentoring the next generation.',
      expertise: ['Natural Language Processing', 'Model Training', 'Open Source']
    },
    {
      id: '6',
      name: 'Priya Sharma',
      title: 'Product Manager',
      company: 'Meta AI',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/priyasharma',
      bio: 'Product leader specializing in AI-powered social platforms and user experience.',
      expertise: ['Product Strategy', 'User Experience', 'AI Products']
    },
    {
      id: '7',
      name: 'James Wilson',
      title: 'Data Science Lead',
      company: 'Spotify',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/jameswilson',
      github: 'https://github.com/jameswilson',
      bio: 'Data scientist with experience in recommendation systems and music AI.',
      expertise: ['Data Science', 'Recommendation Systems', 'Music Technology']
    },
    {
      id: '8',
      name: 'Lisa Chang',
      title: 'AI Researcher',
      company: 'Stanford AI Lab',
      image: '/api/placeholder/300/300',
      linkedin: 'https://linkedin.com/in/lisachang',
      twitter: 'https://twitter.com/lisachang',
      bio: 'PhD researcher focusing on AI for healthcare and social good applications.',
      expertise: ['Healthcare AI', 'Research', 'Social Impact']
    }
  ];

  const currentData = activeTab === 'judges' ? judges : mentors;
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(currentData.length / itemsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Reset slide when switching tabs
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return currentData.slice(startIndex, startIndex + itemsPerSlide);
  };

  const PersonCard: React.FC<{ person: Person; index: number }> = ({ person, index }) => (
    <motion.div
      key={person.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="h-full"
    >
      <GlassmorphismCard className="p-6 text-center h-full flex flex-col border border-white/10 hover:border-primary-blue/50 transition-colors">
        {/* Profile Image */}
        <div className="relative mb-6">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-primary-purple to-primary-blue"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=4F46E5&color=fff&size=200`;
              }}
            />
          </motion.div>
          
          {/* Online Status Indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
        </div>

        {/* Name and Title */}
        <h3 className="text-xl font-bold text-white mb-2">{person.name}</h3>
        <p className="text-primary-blue font-semibold mb-1">{person.title}</p>
        <p className="text-gray-400 text-sm mb-4">{person.company}</p>

        {/* Bio */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
          {person.bio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {person.expertise.slice(0, 2).map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 bg-primary-purple/20 text-primary-purple text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {person.expertise.length > 2 && (
            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
              +{person.expertise.length - 2} more
            </span>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-3">
          {person.linkedin && (
            <motion.a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.a>
          )}
          {person.twitter && (
            <motion.a
              href={person.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter className="w-5 h-5" />
            </motion.a>
          )}
          {person.github && (
            <motion.a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </GlassmorphismCard>
    </motion.div>
  );

  return (
    <section id="judges" className="section-padding px-8 bg-gradient-to-b from-black via-blue-900/10 to-black">
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
              <span className="gradient-text">Meet Our Experts</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn from industry leaders and get guidance from experienced mentors
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-12">
            <div className="glass-card p-2 inline-flex rounded-full">
              <button
                onClick={() => setActiveTab('judges')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'judges'
                    ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Judges ({judges.length})
              </button>
              <button
                onClick={() => setActiveTab('mentors')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'mentors'
                    ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mentors ({mentors.length})
              </button>
            </div>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Controls */}
            <div className="flex justify-between items-center mb-8">
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={prevSlide}
                  className="glass-button p-3 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={totalSlides <= 1}
                >
                  <FaChevronLeft className="w-5 h-5 text-white" />
                </motion.button>
                
                <motion.button
                  onClick={nextSlide}
                  className="glass-button p-3 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={totalSlides <= 1}
                >
                  <FaChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Auto-play Control */}
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="glass-button px-4 py-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                <span className="text-sm">{isAutoPlaying ? 'Pause' : 'Play'}</span>
              </motion.button>
            </div>

            {/* Carousel Content */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${currentSlide}`}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {getCurrentSlideItems().map((person, index) => (
                    <PersonCard key={person.id} person={person} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-primary-purple to-primary-blue scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}
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
              <div className="glass-card p-8 cursor-pointer group max-w-2xl mx-auto">
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                  Ready to Learn from the Best?
                </h4>
                <p className="text-lg text-gray-300 mb-6 group-hover:text-white transition-colors">
                  Get personalized guidance and feedback from our expert {activeTab} throughout the hackathon!
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold text-lg">Join the Hackathon</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaChevronRight className="text-lg" />
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

export default JudgesSection;