import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '../components/AuthLayout';
import ProgressIndicator from '../components/ProgressIndicator';
import { toast } from 'sonner';

const REGISTRATION_STEPS = ['Parent Info', 'Child Profile', 'Learning Background', 'Extra Questions', 'Consent'];

const SignUpStep3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('signup_step3');
    return saved ? JSON.parse(saved) : {
      strugglingWithReading: '',
      letterMixups: '',
      feelingAboutReading: '',
      teacherMentioned: '',
      difficultySpelling: '',
      prefersListening: '',
    };
  });

  const handleNext = () => {
    const allFilled = Object.values(formData).every((value) => value !== '');
    if (!allFilled) {
      toast.error('Please answer all questions');
      return;
    }

    localStorage.setItem('signup_step3', JSON.stringify(formData));
    navigate('/auth/signup/step4');
  };

  const handleBack = () => {
    localStorage.setItem('signup_step3', JSON.stringify(formData));
    navigate('/auth/signup/step2');
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={3} totalSteps={5} steps={REGISTRATION_STEPS} />
        
        <div className="glass rounded-2xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Background</h1>
            <p className="text-foreground/70">Help us understand your child's reading experience</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3 text-left">
              <Label>
                Is your child struggling with reading or writing? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.strugglingWithReading} onValueChange={(value) => setFormData({ ...formData, strugglingWithReading: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="struggling-yes" />
                  <Label htmlFor="struggling-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="struggling-no" />
                  <Label htmlFor="struggling-no" className="font-normal cursor-pointer">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="struggling-not-sure" />
                  <Label htmlFor="struggling-not-sure" className="font-normal cursor-pointer">Not Sure</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 text-left">
              <Label>
                How often does your child mix up letters like b/d, p/q, m/w? <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.letterMixups} onValueChange={(value) => setFormData({ ...formData, letterMixups: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="often">Often</SelectItem>
                  <SelectItem value="sometimes">Sometimes</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 text-left">
              <Label>
                How does your child feel about reading? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.feelingAboutReading} onValueChange={(value) => setFormData({ ...formData, feelingAboutReading: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enjoys" id="feeling-enjoys" />
                  <Label htmlFor="feeling-enjoys" className="font-normal cursor-pointer">Enjoys it</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="feeling-neutral" />
                  <Label htmlFor="feeling-neutral" className="font-normal cursor-pointer">Neutral / Doesn't mind</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="avoids" id="feeling-avoids" />
                  <Label htmlFor="feeling-avoids" className="font-normal cursor-pointer">Avoids or dislikes it</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 text-left">
              <Label>
                Has a teacher mentioned learning difficulties? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.teacherMentioned} onValueChange={(value) => setFormData({ ...formData, teacherMentioned: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="teacher-yes" />
                  <Label htmlFor="teacher-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="teacher-no" />
                  <Label htmlFor="teacher-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 text-left">
              <Label>
                Does your child have difficulty remembering spellings? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.difficultySpelling} onValueChange={(value) => setFormData({ ...formData, difficultySpelling: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="spelling-yes" />
                  <Label htmlFor="spelling-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="spelling-no" />
                  <Label htmlFor="spelling-no" className="font-normal cursor-pointer">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="spelling-not-sure" />
                  <Label htmlFor="spelling-not-sure" className="font-normal cursor-pointer">Not Sure</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 text-left">
              <Label>
                Does your child prefer listening to stories over reading them? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.prefersListening} onValueChange={(value) => setFormData({ ...formData, prefersListening: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="listening-yes" />
                  <Label htmlFor="listening-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="listening-no" />
                  <Label htmlFor="listening-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
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

export default SignUpStep3;
