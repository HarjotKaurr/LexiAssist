import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from '../components/AuthLayout';
import ProgressIndicator from '../components/ProgressIndicator';
import { toast } from 'sonner';

const REGISTRATION_STEPS = ['Parent Info', 'Child Profile', 'Learning Background', 'Extra Questions', 'Consent'];

const SignUpStep4 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('signup_step4');
    return saved ? JSON.parse(saved) : {
      problemsSince: '',
      problemAreas: [] as string[],
      additionalInfo: '',
    };
  });

  const problemAreaOptions = [
    'Reading comprehension',
    'Spelling',
    'Writing',
    'Letter recognition',
    'Phonics',
    'Memory retention',
    'Focus and concentration',
    'Processing speed',
  ];

  const toggleProblemArea = (area: string) => {
    setFormData({
      ...formData,
      problemAreas: formData.problemAreas.includes(area)
        ? formData.problemAreas.filter((a: string) => a !== area)
        : [...formData.problemAreas, area],
    });
  };

  const handleNext = () => {
    if (!formData.problemsSince) {
      toast.error('Please indicate when the problems were first observed');
      return;
    }

    localStorage.setItem('signup_step4', JSON.stringify(formData));
    navigate('/auth/signup/step5');
  };

  const handleBack = () => {
    localStorage.setItem('signup_step4', JSON.stringify(formData));
    navigate('/auth/signup/step3');
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={5} steps={REGISTRATION_STEPS} />
        
        <div className="glass rounded-2xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Additional Details</h1>
            <p className="text-foreground/70">Help us better understand your child's situation</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="problemsSince">
                Since when have these problems been observed? <span className="text-destructive">*</span>
              </Label>
              <Input
                id="problemsSince"
                placeholder="e.g., Since kindergarten, Last 6 months, Since 2nd grade"
                value={formData.problemsSince}
                onChange={(e) => setFormData({ ...formData, problemsSince: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">You can provide an approximate timeframe</p>
            </div>

            <div className="space-y-3 text-left">
              <Label>Where do you notice the most difficulty?</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {problemAreaOptions.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.problemAreas.includes(area)}
                      onCheckedChange={() => toggleProblemArea(area)}
                    />
                    <label htmlFor={area} className="text-sm cursor-pointer">
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="additionalInfo">
                Anything else you'd like us to know about your child? (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Share any additional context, concerns, or observations that might help us understand your child better..."
                rows={5}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This could include specific behaviors, strengths, interests, or challenges
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Next Step →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpStep4;
