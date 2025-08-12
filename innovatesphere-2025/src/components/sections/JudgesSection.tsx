import React from 'react';
import { motion } from 'framer-motion';
// import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
// import { 
//   FaLinkedin,
//   FaTwitter,
//   FaGithub
// } from 'react-icons/fa';

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

  const judges: Person[] = [
    {
      id: '1',
      name: 'Dr. A. Prabhakara Reddy',
      title: 'Chief Executive Officer (CEO)',
      company: 'BTI IGNITE INCUBATION COUNCIL',
      image: '/assets/Photos/Dr. A. Prabhakara Reddy.png',
      linkedin: '',
      bio: 'Visionary leader driving innovation and entrepreneurship through BTI Ignite Incubation Council.',
      expertise: ['Leadership', 'Innovation', 'Incubation']
    },
    {
      id: '2',
      name: 'Dr. N. Manjula',
      title: 'Chief Financial Officer (CFO)',
      company: 'BTI IGNITE INCUBATION COUNCIL',
      image: '/assets/Photos/Dr. N Manjula.png',
      linkedin: '',
      bio: 'Strategic financial leader ensuring sustainable growth and fiscal excellence at BTI Ignite.',
      expertise: ['Financial Management', 'Strategic Planning', 'Operations']
    },
    {
      id: '3',
      name: 'Dr. Sujana P Reddy',
      title: 'Chief Operating Officer (COO)',
      company: 'BTI IGNITE INCUBATION COUNCIL',
      image: '/assets/Photos/Dr. Sujana P Reddy.png',
      linkedin: '',
      bio: 'Operations expert driving efficiency and excellence in incubation programs and initiatives.',
      expertise: ['Operations Management', 'Program Development', 'Leadership']
    },
    {
      id: '4',
      name: 'Dr. Prabhakar Sekar',
      title: 'Chief Technology Officer (CTO)',
      company: 'BTI IGNITE INCUBATION COUNCIL',
      image: '/assets/Photos/Dr. Prabhakar Sekar.png',
      linkedin: '',
      bio: 'Technology visionary leading innovation and technical excellence in startup incubation.',
      expertise: ['Technology Leadership', 'Innovation', 'Technical Strategy']
    }
  ];

  /*
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
  */

  // Show only the first 4 people from judges array
  const displayedExperts = judges.slice(0, 4);

  const PersonCard: React.FC<{ person: Person; index: number }> = ({ person, index }) => (
    <motion.div
      key={person.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="h-full group"
    >
      <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 hover:border-primary-blue/60 hover:shadow-2xl hover:shadow-primary-blue/20">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-primary-blue/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full text-center">
          {/* Profile Image */}
          <div className="relative mb-6">
            <motion.div
              className="w-28 h-28 mx-auto rounded-full overflow-hidden border-3 border-gradient-to-r from-primary-purple to-primary-blue shadow-lg"
              whileHover={{ scale: 1.05 }}
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
          </div>

          {/* Name and Title */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-purple group-hover:to-primary-blue transition-all duration-300">
              {person.name}
            </h3>
            <div className="space-y-1">
              <p className="text-primary-blue font-semibold text-sm">{person.title}</p>
              <p className="text-gray-400 text-xs font-medium">{person.company}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-300 text-sm leading-relaxed flex-grow opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {person.bio}
          </p>
        </div>
      </div>
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
              <span className="gradient-text">Organizing Committee</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn from industry leaders and get guidance from experienced mentors
            </p>
          </motion.div>



          {/* Static Grid Container */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {displayedExperts.map((person, index) => (
              <PersonCard key={person.id} person={person} index={index} />
            ))}
          </motion.div>

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
                  Get personalized guidance and feedback from our expert judges and mentors throughout the hackathon!
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold text-lg">Join the Hackathon</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-lg">→</span>
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