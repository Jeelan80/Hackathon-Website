import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import {
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';

interface Coordinator {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  github?: string;
  linkedin?: string;
}

const CoordinatorsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const coordinators: Coordinator[] = [
    {
      id: '1',
      name: 'Jeelan Basha',
      role: 'Website Designer & Technical Coordinator',
      department: 'AI&ML, BTI',
      image: '/assets/Photos/Hackathon Crew/Jeelan Basha.png',
      github: 'https://github.com/jeelan80',
      linkedin: 'https://www.linkedin.com/in/jeelan-basha-508a19314/'
    },
    {
      id: '2',
      name: 'Sameer',
      role: 'Website Designer & Technical Coordinator',
      department: 'ROAI, BTI',
      image: '/assets/Photos/Hackathon Crew/Sameer.png',
      github: 'https://github.com/sameersam648',
      linkedin: 'https://www.linkedin.com/in/sameer-83733a2a6/'
    },
    {
      id: '3',
      name: 'Aman Kumar',
      role: 'Technical Coordinator',
      department: 'ROAI, BTI',
      image: '/assets/Photos/Hackathon Crew/Aman Kumar.png',
      github: 'https://github.com/Amankumar006/',
      linkedin: 'https://github.com/Amankumar006'
    },
    {
      id: '4',
      name: 'Likhith Kumar',
      role: 'Poster Designer & Technical Coordinator',
      department: 'AI&ML, BTI',
      image: '/assets/Photos/Hackathon Crew/Likhith Kumar.png',
      github: 'https://github.com/likhithkumar',
      linkedin: 'https://www.linkedin.com/in/likhithkumarj/'
    },
    {
      id: '5',
      name: 'Pruthvi Narayana Reddy V',
      role: 'Event Manager',
      department: '',
      image: '/assets/Photos/Hackathon Crew/Pruthvi Narayana Reddy V.jpg'
    },
    {
      id: '6',
      name: ' Apolise Dias',
      role: 'HR Intern',
      department: '',
      image: '/assets/Photos/Hackathon Crew/Apolise Dias.png'
    },
    {
      id: '7',
      name: 'Hemavathi',
      role: 'Finance Intern',
      department: '',
      image: '/assets/Photos/Hackathon Crew/Hemavathi.png'
    },
    {
      id: '8',
      name: 'Santhosh',
      role: 'Finance Intern',
      department: '',
      image: '/assets/Photos/Hackathon Crew/Santhosh.png'
    },
    {
      id: '9',
      name: 'Prajwal',
      role: 'Startup Networking Intern',
      department: '',
      image: '/assets/Photos/Hackathon Crew/Prajwal.png'
    }
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(coordinators.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return coordinators.slice(startIndex, startIndex + itemsPerSlide);
  };

  const CoordinatorCard: React.FC<{ coordinator: Coordinator; index: number }> = ({ coordinator, index }) => (
    <motion.div
      key={coordinator.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="flex-shrink-0"
    >
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 w-64 h-80 transition-all duration-300 hover:border-primary-blue/60 hover:shadow-xl hover:shadow-primary-blue/20 hover:shadow-2xl group overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-primary-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center h-full text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Profile Image */}
          <div className="relative mb-4">
            <motion.div
              className="w-24 h-24 rounded-full overflow-hidden border-3 border-gradient-to-r from-primary-purple to-primary-blue shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={coordinator.image}
                alt={coordinator.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(coordinator.name)}&background=4F46E5&color=fff&size=200`;
                }}
              />
            </motion.div>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-yellow-400 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 transition-all duration-300">
            {coordinator.name}
          </h3>

          {/* Role */}
          <p className="text-gray-300 text-sm font-medium mb-2">{coordinator.role}</p>

          {/* Department */}
          <p className="text-gray-500 text-xs mb-6">{coordinator.department}</p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-auto">
            {coordinator.github && (
              <motion.a
                href={coordinator.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="w-4 h-4" />
              </motion.a>
            )}
            {coordinator.linkedin && (
              <motion.a
                href={coordinator.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="coordinators" className="section-padding px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
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
              <span className="gradient-text">Hackathon Crew</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet the amazing team making HACKFINITY possible
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-8">
              <motion.button
                onClick={prevSlide}
                className="glass-button p-4 rounded-full hover:bg-white/10 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={totalSlides <= 1}
              >
                <FaChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="glass-button p-4 rounded-full hover:bg-white/10 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={totalSlides <= 1}
              >
                <FaChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Carousel Content */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="flex justify-center gap-6"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {getCurrentSlideItems().map((coordinator, index) => (
                    <CoordinatorCard key={coordinator.id} coordinator={coordinator} index={index} />
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;