import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
}

const AuthLayout = ({ children, showLogo = true }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showLogo && (
        <header className="w-full py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/favicon.ico" alt="LexiAssist" className="w-12 h-12" />
              <span className="text-2xl font-bold text-foreground">LexiAssist</span>
            </Link>
          </div>
        </header>
      )}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
