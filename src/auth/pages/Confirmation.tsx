import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthLayout from '../components/AuthLayout';

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/screening');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass rounded-2xl p-10 sm:p-12 animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Welcome to LexiAssist!
          </h1>

          <p className="text-lg text-foreground/70 mb-8">
            Your registration is complete. We're excited to help your child discover 
            their unique learning style!
          </p>

          <div className="bg-primary/5 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3 text-center">What's Next?</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🎮</span>
                <div>
                  <strong>Complete the Screening:</strong> Your child will play 3 fun games 
                  that take about 5-7 minutes total
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">📊</span>
                <div>
                  <strong>Get Results:</strong> Receive personalized insights about your 
                  child's learning style and strengths
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">💡</span>
                <div>
                  <strong>Take Action:</strong> Use our recommendations to support your 
                  child's learning journey
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/screening')} 
              size="lg"
              className="w-full sm:w-auto"
            >
              Start Screening Now →
            </Button>
            <p className="text-xs text-muted-foreground">
              Redirecting automatically in a few seconds...
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Confirmation;
