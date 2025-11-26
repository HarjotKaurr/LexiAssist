import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="w-full py-6 px-4 sm:px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/favicon.ico" alt="LexiAssist" className="w-12 h-12" />
            <span className="text-2xl font-bold text-foreground">LexiAssist</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/about" className="hidden sm:inline text-sm text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="hidden sm:inline text-sm text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <section className="section-padding text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              🌟 Empowering Young Learners
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Discover Your Child's{' '}
              <span className="text-gradient-primary">Unique Learning Style</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              LexiAssist helps identify potential reading challenges through fun, 
              interactive games designed specifically for children aged 8-12.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link to="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started For Free
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  I Already Have an Account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold">Sign Up</h4>
                <p className="text-sm text-foreground/70">
                  Create your free account in just a few minutes
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold">Play Games</h4>
                <p className="text-sm text-foreground/70">
                  Your child completes fun screening activities
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold">Get Results</h4>
                <p className="text-sm text-foreground/70">
                  Receive personalized learning recommendations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/60">
          <p>&copy; 2024 LexiAssist. Made with 💜 for young learners.</p>
          <p className="mt-2 text-xs">
            This is not a clinical diagnosis tool. Please consult with healthcare professionals for formal assessments.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
