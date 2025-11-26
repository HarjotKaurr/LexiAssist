import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from '../components/AuthLayout';
import ProgressIndicator from '../components/ProgressIndicator';
import { useAuth, RegistrationData } from '../AuthContext';
import { toast } from 'sonner';

const REGISTRATION_STEPS = ['Parent Info', 'Child Profile', 'Learning Background', 'Extra Questions', 'Consent'];

const SignUpStep5 = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [consentAnalysis, setConsentAnalysis] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);

  const handleSubmit = async () => {
    if (!consentAnalysis) {
      toast.error('Please consent to data analysis to continue');
      return;
    }

    if (!consentTerms) {
      toast.error('Please accept the terms of service');
      return;
    }

    const step1 = JSON.parse(localStorage.getItem('signup_step1') || '{}');
    const step2 = JSON.parse(localStorage.getItem('signup_step2') || '{}');
    const step3 = JSON.parse(localStorage.getItem('signup_step3') || '{}');
    const step4 = JSON.parse(localStorage.getItem('signup_step4') || '{}');

    const allData: RegistrationData = {
      ...step1,
      ...step2,
      ...step3,
      ...step4,
      consentAnalysis,
    };

    setIsLoading(true);
    try {
      await signup(allData);
      
      localStorage.removeItem('signup_step1');
      localStorage.removeItem('signup_step2');
      localStorage.removeItem('signup_step3');
      localStorage.removeItem('signup_step4');
      
      toast.success('Registration successful! Welcome to LexiAssist!');
      navigate('/confirmation');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/auth/signup/step4');
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={5} totalSteps={5} steps={REGISTRATION_STEPS} />
        
        <div className="glass rounded-2xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Consent & Privacy</h1>
            <p className="text-foreground/70">Almost done! Please review and accept our terms</p>
          </div>

          <div className="space-y-6">
            <div className="bg-primary/5 rounded-lg p-6 text-left space-y-4">
              <h3 className="font-semibold text-lg">📊 Data Usage</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                LexiAssist analyzes gameplay data from the screening activities to generate 
                personalized learning insights and recommendations for your child. This data 
                is stored securely and used solely to improve your child's learning experience.
              </p>
              
              <h3 className="font-semibold text-lg mt-6">🔒 Privacy & Security</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We take your child's privacy seriously. All data is encrypted, stored securely, 
                and will never be shared with third parties without your explicit consent. 
                You can request to view or delete your data at any time.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors">
                <Checkbox
                  id="consent-analysis"
                  checked={consentAnalysis}
                  onCheckedChange={(checked) => setConsentAnalysis(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="consent-analysis" className="text-sm cursor-pointer block">
                    <span className="font-medium">I give permission to analyze gameplay data</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      This allows us to generate personalized learning recommendations for your child
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors">
                <Checkbox
                  id="consent-terms"
                  checked={consentTerms}
                  onCheckedChange={(checked) => setConsentTerms(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="consent-terms" className="text-sm cursor-pointer block">
                    <span className="font-medium">I accept the Terms of Service and Privacy Policy</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      By registering, you agree to our terms and conditions
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
              <p className="text-sm text-amber-900">
                <strong>Important:</strong> LexiAssist is a screening tool, not a diagnostic instrument. 
                For a formal assessment or diagnosis, please consult with a qualified healthcare professional 
                or educational psychologist.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" onClick={handleBack} disabled={isLoading} className="flex-1">
                ← Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || !consentAnalysis || !consentTerms}
                className="flex-1"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration ✓'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpStep5;
