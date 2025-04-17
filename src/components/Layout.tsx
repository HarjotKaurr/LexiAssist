import React from 'react';
import Navigation from './Navigation';
import { useTest } from '../context/TestContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { preferredLanguage } = useTest();
  
  const footerText = {
    english: "© 2025 LexiAssist. Making learning fun for everyone!",
    hindi: "© 2025  लेक्सी असिस्ट। सभी के लिए सीखना मज़ेदार बनाना!",
    tamil: "© 2025 லெக்ஸி அசிஸ்ட். அனைவருக்கும் கற்றல் வேடிக்கையாக!"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fef7cd] to-[#fef7cd]/50">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <footer className="py-6 bg-white/80 backdrop-blur-sm border-t border-primary/10">
        <div className="container">
          <p className="text-sm text-center text-muted-foreground font-dyslexic">
            {footerText[preferredLanguage]}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
