import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import type { SupportedLanguage } from '../context/TestContext';


const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { preferredLanguage, setPreferredLanguage } = useTest();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as SupportedLanguage;
    setPreferredLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <header className={`w-full z-50 transition-all duration-300`}>
      <div className="w-full px-6 sm:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/LexiAssist1.png" alt="LexiAssist Logo" className="h-16 sm:h-20 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105" />
        </Link>

        <div className="flex items-center space-x-4">
          <select
            className="bg-white border border-primary rounded-md px-3 py-2 text-sm font-dyslexic focus:outline-none focus:ring-2 focus:ring-primary"
            value={preferredLanguage}
            onChange={handleLanguageChange}
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            <option value="tamil">தமிழ்</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

