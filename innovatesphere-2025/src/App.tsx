import { useState } from 'react';
import { AnimatedButton, Card, Modal, Accordion } from './components/ui';
import { Layout } from './components/layout';
import { HeroSection, AboutSection, BenefitsSection, ScheduleSection } from './components/sections';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accordionItems = [
    {
      id: '1',
      title: 'What is InnovateSphere 2025?',
      content: 'A 48-hour virtual hackathon focused on building AI solutions for social good.'
    },
    {
      id: '2',
      title: 'How do I register?',
      content: 'Click the Register Now button and fill out the registration form.'
    },
    {
      id: '3',
      title: 'What are the prizes?',
      content: 'We have ₹18,000 in total prizes including a ₹10,000 grand prize!'
    }
  ];

  console.log('App component loaded with new components');
  
  return (
    <Layout onRegisterClick={() => setIsModalOpen(true)}>
      {/* Enhanced Hero Section */}
      <HeroSection onRegisterClick={() => setIsModalOpen(true)} />

      {/* About Section */}
      <AboutSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Schedule Section */}
      <ScheduleSection />

      {/* Component Showcase Section */}
      <section className="section-padding px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Component Showcase
          </h2>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card 
              title="Glassmorphism Card" 
              icon={<div className="w-8 h-8 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full" />}
              glow
            >
              <p className="text-white/80">
                Beautiful glassmorphism effects with blur and transparency.
              </p>
            </Card>
            
            <Card 
              title="Animated Interactions" 
              icon={<div className="w-8 h-8 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full animate-pulse" />}
            >
              <p className="text-white/80">
                Smooth animations and hover effects powered by Framer Motion.
              </p>
            </Card>
            
            <Card 
              title="Responsive Design" 
              icon={<div className="w-8 h-8 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full animate-bounce" />}
            >
              <p className="text-white/80">
                Mobile-first design that works beautifully on all devices.
              </p>
            </Card>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">
              Frequently Asked Questions
            </h3>
            <div className="max-w-3xl mx-auto">
              <Accordion items={accordionItems} />
            </div>
          </div>

          {/* Button Showcase */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-white">Button Variants</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton variant="primary" size="sm" onClick={() => {}}>
                Primary Small
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="md" onClick={() => {}}>
                Secondary Medium
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="lg" onClick={() => {}}>
                Ghost Large
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Registration"
        size="md"
      >
        <div className="space-y-4">
          <p>Welcome to InnovateSphere 2025!</p>
          <p>This is a demo modal showcasing our glassmorphism design system.</p>
          <div className="flex justify-end gap-4 mt-6">
            <AnimatedButton 
              variant="ghost" 
              size="md" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton 
              variant="primary" 
              size="md" 
              onClick={() => setIsModalOpen(false)}
            >
              Continue
            </AnimatedButton>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App
