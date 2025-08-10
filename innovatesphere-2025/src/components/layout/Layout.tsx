import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onRegisterClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-black">
      <Header onRegisterClick={onRegisterClick} />
      
      {/* Main Content with proper spacing for fixed header */}
      <main className="relative">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;