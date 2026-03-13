
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './shared/navbar';
import Footer from './shared/footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${!isHomePage ? 'pt-20 md:pt-24' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
