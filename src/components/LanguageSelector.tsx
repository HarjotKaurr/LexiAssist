
import React from 'react';
import { useTest } from '../context/TestContext';

const LanguageSelector: React.FC = () => {
  const { preferredLanguage, setLanguagePreference } = useTest();

  const languages = [
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'हिंदी (Hindi)' },
    { code: 'tamil', label: 'தமிழ் (Tamil)' },
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Language:</span>
      <div className="flex rounded-md overflow-hidden border border-input">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguagePreference(lang.code)}
            className={`px-3 py-1 text-sm transition-colors ${
              preferredLanguage === lang.code
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-muted'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
