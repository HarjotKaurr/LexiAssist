import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from '../components/AuthLayout';
import ProgressIndicator from '../components/ProgressIndicator';
import { toast } from 'sonner';

const REGISTRATION_STEPS = ['Parent Info', 'Child Profile', 'Learning Background', 'Extra Questions', 'Consent'];

const SignUpStep2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('signup_step2');
    return saved ? JSON.parse(saved) : {
      childName: '',
      childAge: '',
      childGrade: '',
      primaryLanguage: '',
      languagesCanRead: [] as string[],
    };
  });

  const languageOptions = ['English', 'Spanish', 'Hindi', 'French', 'Mandarin', 'Other'];

  const toggleLanguage = (lang: string) => {
    setFormData({
      ...formData,
      languagesCanRead: formData.languagesCanRead.includes(lang)
        ? formData.languagesCanRead.filter((l: string) => l !== lang)
        : [...formData.languagesCanRead, lang],
    });
  };

  const handleNext = () => {
    if (!formData.childName || !formData.childAge || !formData.childGrade || !formData.primaryLanguage) {
      toast.error('Please fill in all required fields');
      return;
    }

    localStorage.setItem('signup_step2', JSON.stringify(formData));
    navigate('/auth/signup/step3');
  };

  const handleBack = () => {
    localStorage.setItem('signup_step2', JSON.stringify(formData));
    navigate('/auth/signup/step1');
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={2} totalSteps={5} steps={REGISTRATION_STEPS} />
        
        <div className="glass rounded-2xl p-8 sm:p-10 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Child's Basic Profile</h1>
            <p className="text-foreground/70">Tell us about the child who will use LexiAssist</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="childName">
                Child's Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="childName"
                placeholder="Child's first name"
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="childAge">
                  Child's Age <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.childAge} onValueChange={(value) => setFormData({ ...formData, childAge: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {[8, 9, 10, 11, 12, 13, 14, 15].map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="childGrade">
                  Class/Grade <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.childGrade} onValueChange={(value) => setFormData({ ...formData, childGrade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade} Grade
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="primaryLanguage">
                Primary Language Spoken at Home <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.primaryLanguage} onValueChange={(value) => setFormData({ ...formData, primaryLanguage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="mandarin">Mandarin</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 text-left">
              <Label>Languages the Child Can Read/Write</Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {languageOptions.map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      id={lang}
                      checked={formData.languagesCanRead.includes(lang)}
                      onCheckedChange={() => toggleLanguage(lang)}
                    />
                    <label htmlFor={lang} className="text-sm cursor-pointer">
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
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

export default SignUpStep2;
