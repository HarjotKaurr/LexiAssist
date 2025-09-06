import React, { useState } from 'react';
import { useTest } from '../context/TestContext';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Storybook: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  const translations = {
    english: {
      title: "Storybook Challenge",
      description: "This challenge will be available soon! Check back later for an exciting story adventure.",
      comingSoon: "Coming Soon...",
      backHome: "Back to Home",
      placeholder: "Stay tuned for interactive stories that will help improve your reading skills!"
    },
    hindi: {
      title: "स्टोरीबुक चुनौती",
      description: "यह चुनौती जल्द ही उपलब्ध होगी! एक रोमांचक कहानी के लिए बाद में वापस देखें।",
      comingSoon: "जल्दी आ रहा है...",
      backHome: "होम पर वापस",
      placeholder: "इंटरैक्टिव कहानियों के लिए बने रहें जो आपके पढ़ने के कौशल में सुधार करने में मदद करेंगी!"
    },
    tamil: {
      title: "கதைப்புத்தக சவால்",
      description: "இந்த சவால் விரைவில் கிடைக்கும்! ஒரு அற்புதமான கதை சாகசத்திற்கு பின்னர் திரும்பி வாருங்கள்.",
      comingSoon: "விரைவில் வருகிறது...",
      backHome: "முகப்புக்கு திரும்பு",
      placeholder: "உங்கள் வாசிப்பு திறனை மேம்படுத்த உதவும் ஊடாடும் கதைகளுக்காக காத்திருங்கள்!"
    }
  };

  const content = translations[preferredLanguage];

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fef7cd]/50 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={handleGoHome}
            className="absolute top-4 left-4 text-[#6C63FF] hover:bg-[#6C63FF]/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {content.backHome}
          </Button>
          
          <h1 className="text-4xl font-bold mb-6 text-[#2B2D42]">{content.title}</h1>
        </div>

        {/* Coming Soon Content */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-lg p-12 border-2 border-[#CADCFC]">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-bold mb-4 text-[#6C63FF]">{content.comingSoon}</h2>
            <p className="text-lg text-[#555770] mb-6">{content.description}</p>
            <div className="bg-[#FFE3EC] rounded-2xl p-6">
              <p className="text-base text-[#6C63FF]">{content.placeholder}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storybook;