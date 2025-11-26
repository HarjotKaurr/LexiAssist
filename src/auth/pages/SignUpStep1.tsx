import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '../components/AuthLayout';
import ProgressIndicator from '../components/ProgressIndicator';
import { toast } from 'sonner';

const REGISTRATION_STEPS = ['Parent Info', 'Child Profile', 'Learning Background', 'Extra Questions', 'Consent'];

const SignUpStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('signup_step1');
    return saved ? JSON.parse(saved) : {
      parentName: '',
      relationship: '',
      email: '',
      mobile: '',
      preferredLanguage: '',
    };
  });

  const handleNext = () => {
    if (!formData.parentName || !formData.relationship || !formData.email || !formData.preferredLanguage) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    localStorage.setItem('signup_step1', JSON.stringify(formData));
    navigate('/auth/signup/step2');
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={1} totalSteps={5} steps={REGISTRATION_STEPS} />
        
        <div className="glass rounded-2xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Parent Information</h1>
            <p className="text-foreground/70">Let's start with your basic details</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="parentName">
                Parent Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="parentName"
                placeholder="Enter your full name"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="relationship">
                Relationship to Child <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.relationship} onValueChange={(value) => setFormData({ ...formData, relationship: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="email">
                Preferred Email ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">We'll send the screening results to this email</p>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="mobile">Mobile Number (Optional)</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="preferredLanguage">
                Preferred Communication Language <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                Cancel
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

export default SignUpStep1;
