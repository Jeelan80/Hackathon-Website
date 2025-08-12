import { useState, useEffect } from 'react';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { initializeMonitoring } from './utils/monitoring';
import { Modal } from './components/ui';
import { Layout } from './components/layout';
import { HeroSection, AboutSection, ThemesSection, BenefitsSection, PrizesSection, CoordinatorsSection, LocationSection } from './components/sections';
import { LazyWrapper } from './components/loading';
import { ErrorBoundary } from './components/error';
import { 
  LazyScheduleSection, 
  LazyJudgesSection, 
  LazySponsorsSection, 
  LazyFAQSection, 

  LazyRegistrationForm 
} from './components/sections/LazyComponents';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Monitor performance metrics
  usePerformanceMonitor();

  // Initialize monitoring and error tracking
  useEffect(() => {
    initializeMonitoring();
  }, []);


  
  return (
    <ErrorBoundary>
      <Layout onRegisterClick={() => setIsModalOpen(true)}>
        {/* Enhanced Hero Section */}
        <HeroSection onRegisterClick={() => setIsModalOpen(true)} />

        {/* About Section */}
        <AboutSection />

        {/* Themes Section */}
        <ThemesSection />

        {/* Benefits Section */}
        <BenefitsSection />



        {/* Schedule Section - Lazy Loaded */}
        <LazyWrapper skeletonVariant="card" skeletonCount={2}>
          <LazyScheduleSection />
        </LazyWrapper>

        {/* Prizes Section */}
        <PrizesSection />

        {/* Judges Section - Lazy Loaded */}
        <LazyWrapper skeletonVariant="avatar" skeletonCount={4}>
          <LazyJudgesSection />
        </LazyWrapper>

        {/* Coordinators Section */}
        <CoordinatorsSection />

        {/* Sponsors Section - Lazy Loaded */}
        <LazyWrapper skeletonVariant="card" skeletonCount={6}>
          <LazySponsorsSection />
        </LazyWrapper>



        {/* Registration Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Register for HACKFINITY"
          size="lg"
        >
          <LazyWrapper skeletonVariant="form">
            <LazyRegistrationForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => console.log('Registration successful!')}
            />
          </LazyWrapper>
        </Modal>

        {/* FAQ Section - Lazy Loaded */}
        <LazyWrapper skeletonVariant="card" skeletonCount={5}>
          <LazyFAQSection />
        </LazyWrapper>

        {/* Location Section */}
        <LocationSection />
      </Layout>
    </ErrorBoundary>
  );
}

export default App
