import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { 
  FaPlay, 
  FaUsers, 
  FaCode, 
  FaChartLine, 
  FaTrophy,
  FaHandshake,
  FaClock,
  FaCalendarAlt,
  FaCoffee
} from 'react-icons/fa';

const ScheduleSection: React.FC = () => {
  const scheduleEvents = [
    {
      time: "3:00 PM",
      title: "Registration Begins",
      description: "Check-in, team formation, and welcome session. Get ready to innovate!",
      type: "ceremony" as const,
      icon: <FaHandshake className="w-5 h-5" />,
      duration: "1 hour"
    },
    {
      time: "4:00 PM", 
      title: "Hackathon Officially Starts",
      description: "Opening ceremony, problem statements revealed, and rules explained.",
      type: "milestone" as const,
      icon: <FaPlay className="w-5 h-5" />,
      duration: "30 mins"
    },
    {
      time: "4:30 PM",
      title: "Hacking Begins",
      description: "Teams start working on their AI solutions for social good. Mentors available for guidance.",
      type: "workshop" as const,
      icon: <FaCode className="w-5 h-5" />,
      duration: "2.5 hours"
    },
    {
      time: "7:00 PM",
      title: "Snacks Break",
      description: "Quick refreshment break to recharge and network with other teams.",
      type: "ceremony" as const,
      icon: <FaUsers className="w-5 h-5" />,
      duration: "30 mins"
    },
    {
      time: "8:30 PM",
      title: "Dinner Break",
      description: "Networking dinner and informal mentorship sessions. Connect with industry professionals.",
      type: "ceremony" as const,
      icon: <FaUsers className="w-5 h-5" />,
      duration: "1 hour"
    },
    {
      time: "1:00 AM",
      title: "Midnight Coffee/Tea Break",
      description: "Late night fuel! Coffee, tea, and light snacks to keep you energized.",
      type: "ceremony" as const,
      icon: <FaCoffee className="w-5 h-5" />,
      duration: "30 mins"
    },
    {
      time: "8:00 AM",
      title: "Breakfast",
      description: "Morning breakfast to fuel the final stretch of development.",
      type: "ceremony" as const,
      icon: <FaUsers className="w-5 h-5" />,
      duration: "1 hour"
    },
    {
      time: "9:00 AM",
      title: "Final Sprint",
      description: "Last hour to polish your solution and prepare for submission.",
      type: "workshop" as const,
      icon: <FaCode className="w-5 h-5" />,
      duration: "1 hour"
    },
    {
      time: "10:00 AM",
      title: "Submission Deadline",
      description: "All projects must be submitted. No more coding allowed after this point!",
      type: "milestone" as const,
      icon: <FaClock className="w-5 h-5" />,
      duration: "15 mins"
    },
    {
      time: "10:15 AM",
      title: "PPT Submission Deadline",
      description: "Final presentation slides must be submitted for judging.",
      type: "milestone" as const,
      icon: <FaChartLine className="w-5 h-5" />,
      duration: "45 mins"
    },
    {
      time: "11:00 AM",
      title: "Top 3 Teams Finalized",
      description: "Judges announce the top 3 teams who will present to the panel.",
      type: "milestone" as const,
      icon: <FaTrophy className="w-5 h-5" />,
      duration: "30 mins"
    },
    {
      time: "11:30 AM",
      title: "Event Closure",
      description: "Winner announcements, awards ceremony, and closing remarks.",
      type: "ceremony" as const,
      icon: <FaTrophy className="w-5 h-5" />,
      duration: "30 mins"
    }
  ];



  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'from-primary-purple to-primary-blue';
      case 'workshop':
        return 'from-green-500 to-emerald-600';
      case 'ceremony':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getEventTypeBorder = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'border-primary-purple';
      case 'workshop':
        return 'border-green-500';
      case 'ceremony':
        return 'border-orange-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <section id="schedule" className="section-padding px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
<motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Event Schedule</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              18 hours of intense innovation, collaboration, and impact
            </p>
            
            {/* Event Date */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-3 glass-card px-6 py-3"
            >
              <FaCalendarAlt className="text-primary-blue" />
              <span className="text-lg font-semibold text-white">August 23-24, 2025</span>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-purple via-primary-blue to-primary-purple transform md:-translate-x-1/2"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />

            {/* Timeline Events */}
            <div className="space-y-6 pb-8">
              {scheduleEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)} 
                        flex items-center justify-center text-white shadow-lg border-4 border-black`}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  {/* Event Content */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <GlassmorphismCard 
                        className={`p-4 border-l-4 ${getEventTypeBorder(event.type)} group cursor-pointer`}
                        glow
                      >
                        {/* Time Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                            bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>
                            {event.time}
                          </span>
                          <span className="text-gray-400 text-sm">• {event.duration}</span>
                        </div>

                        {/* Event Title */}
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-blue transition-colors">
                          {event.title}
                        </h3>

                        {/* Event Description */}
                        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          {event.description}
                        </p>

                        {/* Event Type Badge */}
                        <div className="mt-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium 
                            ${event.type === 'milestone' ? 'bg-primary-purple/20 text-primary-purple' : 
                              event.type === 'workshop' ? 'bg-green-500/20 text-green-400' : 
                              'bg-orange-500/20 text-orange-400'}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </GlassmorphismCard>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="glass-card p-6 cursor-pointer group">
                <p className="text-lg text-gray-300 mb-4 group-hover:text-white transition-colors">
                  Ready to code for 18 hours straight?
                </p>
                <div className="flex items-center justify-center gap-2 text-primary-blue group-hover:text-primary-purple transition-colors">
                  <span className="font-semibold">Mark Your Calendar</span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaCalendarAlt className="text-lg" />
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

export default ScheduleSection;