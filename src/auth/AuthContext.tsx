import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: RegistrationData) => Promise<void>;
  logout: () => void;
}

export interface RegistrationData {
  parentName: string;
  relationship: string;
  email: string;
  mobile?: string;
  preferredLanguage: string;
  childName: string;
  childAge: string;
  childGrade: string;
  primaryLanguage: string;
  languagesCanRead: string[];
  strugglingWithReading: string;
  letterMixups: string;
  feelingAboutReading: string;
  teacherMentioned: string;
  difficultySpelling: string;
  prefersListening: string;
  problemsSince: string;
  problemAreas: string[];
  additionalInfo: string;
  consentAnalysis: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('lexiassist_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('lexiassist_user', JSON.stringify(userData));
  };

  const signup = async (data: RegistrationData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = { email: data.email, name: data.parentName };
    setUser(userData);
    localStorage.setItem('lexiassist_user', JSON.stringify(userData));
    localStorage.setItem('lexiassist_registration', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lexiassist_user');
    localStorage.removeItem('lexiassist_registration');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
