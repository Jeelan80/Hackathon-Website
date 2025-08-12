import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard } from '../ui';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { FaMapMarkerAlt, FaDirections, FaEnvelope } from 'react-icons/fa';

const LocationSection: React.FC = () => {
  return (
    <section id="location" className="section-padding px-8 bg-gradient-to-b from-black via-gray-900/50 to-black">
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
              <span className="gradient-text">Event Location</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us at Bangalore Technological Institute for 18 hours of innovation
            </p>
          </motion.div>

          {/* Location Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map Card */}
            <motion.div variants={fadeInUp}>
              <GlassmorphismCard className="p-6 h-full" glow>
                <div className="aspect-video w-full rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.356211246368!2d77.6967099741016!3d12.884801516777316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae132a7ef38a39%3A0xbf888e2c3943f7b3!2sBangalore%20Technological%20Institute!5e0!3m2!1sen!2sin!4v1755003322628!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bangalore Technological Institute Location"
                    className="rounded-xl"
                  />
                </div>
              </GlassmorphismCard>
            </motion.div>

            {/* Location Details */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Address Card */}
              <GlassmorphismCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Venue Address</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Bangalore Technological Institute<br />
                      K.R. Road, V.V. Puram<br />
                      Bangalore, Karnataka 560004<br />
                      India
                    </p>
                  </div>
                </div>
              </GlassmorphismCard>

              {/* Directions Card */}
              <GlassmorphismCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center flex-shrink-0">
                    <FaDirections className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Getting There</h3>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      The campus is easily accessible by public transport and private vehicles.
                    </p>
                    <motion.a
                      href="https://www.google.com/maps/dir//Bangalore+Technological+Institute,+K.R.+Road,+V.V.+Puram,+Bangalore,+Karnataka+560004/@12.884801516777316,77.6967099741016"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-blue hover:text-primary-purple transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDirections />
                      Get Directions
                    </motion.a>
                  </div>
                </div>
              </GlassmorphismCard>

              {/* Contact Info */}
              <GlassmorphismCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      Have questions about the venue or need assistance?
                    </p>
                    <motion.a
                      href="mailto:hello@innovatesphere.com"
                      className="inline-flex items-center gap-2 text-primary-blue hover:text-primary-purple transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEnvelope />
                      Contact Us
                    </motion.a>
                  </div>
                </div>
              </GlassmorphismCard>
            </motion.div>
          </div>

          {/* Event Details */}
          <motion.div variants={fadeInUp} className="mt-12">
            <GlassmorphismCard className="p-8 text-center" glow>
              <h3 className="text-2xl font-bold text-white mb-4">Event Details</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">Aug 23-24</div>
                  <div className="text-gray-300">2025</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">18 Hours</div>
                  <div className="text-gray-300">Non-stop Innovation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text mb-2">Offline</div>
                  <div className="text-gray-300">In-person Event</div>
                </div>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;