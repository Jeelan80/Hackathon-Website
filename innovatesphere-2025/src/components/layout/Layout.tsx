import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AccessibilityToolbar } from '../accessibility';

interface LayoutProps {
  children: React.ReactNode;
  onRegisterClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
      
      {/* Accessibility Tester (Development only) - Currently hidden */}
      {/* <AccessibilityTester /> */}
      
      {/* Performance Dashboard (Development only) - Currently hidden */}
      {/* <PerformanceDashboard /> */}
      
      {/* Skip to main content for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary-blue text-white px-4 py-2 rounded-lg"
      >
        Skip to main content
      </a>
      
      {/* Header with proper navigation landmark */}
      <Header onRegisterClick={onRegisterClick} />
      
      {/* Main Content with proper semantic structure */}
      <main 
        id="main-content" 
        className="relative"
        role="main"
        aria-label="Main content"
        tabIndex={-1}
      >
        {children}
      </main>
      
      {/* Footer with proper content info landmark */}
      <Footer />
    </div>
  );
};

export default Layout;