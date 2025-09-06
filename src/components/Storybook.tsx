import React, { useState } from 'react';
import { useTest } from '../context/TestContext';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Storybook: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const translations = {
    english: {
      title: "Storybook Challenge",
      description: "This challenge will be available soon! Check back later for an exciting story adventure.",
      comingSoon: "Coming Soon...",
      backHome: "Back to Home",
      placeholder: "Stay tuned for interactive stories that will help improve your reading skills!",
      markCompleted: "Mark as Completed",
      completedMessage: "Great! You've acknowledged this upcoming feature. Click the button below to complete this test."
    },
    hindi: {
      title: "स्टोरीबुक चुनौती",
      description: "यह चुनौती जल्द ही उपलब्ध होगी! एक रोमांचक कहानी के लिए बाद में वापस देखें।",
      comingSoon: "जल्दी आ रहा है...",
      backHome: "होम पर वापस",
      placeholder: "इंटरैक्टिव कहानियों के लिए बने रहें जो आपके पढ़ने के कौशल में सुधार करने में मदद करेंगी!",
      markCompleted: "पूर्ण के रूप में चिह्नित करें",
      completedMessage: "बहुत बढ़िया! आपने इस आने वाली सुविधा को स्वीकार कर लिया है। इस परीक्षा को पूरा करने के लिए नीचे दिए गए बटन पर क्लिक करें।"
    },
    tamil: {
      title: "கதைப்புத்தக சவால்",
      description: "இந்த சவால் விரைவில் கிடைக்கும்! ஒரு அற்புதமான கதை சாகசத்திற்கு பின்னர் திரும்பி வாருங்கள்.",
      comingSoon: "விரைவில் வருகிறது...",
      backHome: "முகப்புக்கு திரும்பு",
      placeholder: "உங்கள் வாசிப்பு திறனை மேம்படுத்த உதவும் ஊடாடும் கதைகளுக்காக காத்திருங்கள்!",
      markCompleted: "முடிவு செய்யப்பட்டதாக குறிக்கவும்",
      completedMessage: "சிறப்பு! இந்த வரவிருக்கும் அம்சத்தை நீங்கள் அங்கீகரித்துவிட்டீர்கள். இந்த தேர்வை முடிக்க கீழே உள்ள பொத்தானைக் கிளிக் செய்யவும்."
    }
  };

  const content = translations[preferredLanguage];

  const handleGoHome = () => {
    navigate('/');
  };

  const handleMarkCompleted = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    completeTest('storybook', {
      score: 0,
      totalQuestions: 1,
      timeSpent
    });
    navigate('/results');
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
            data-testid="button-back-home"
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
            <div className="bg-[#FFE3EC] rounded-2xl p-6 mb-6">
              <p className="text-base text-[#6C63FF]">{content.placeholder}</p>
            </div>
            
            <div className="bg-[#E8F5E8] rounded-2xl p-6 mb-6">
              <p className="text-sm text-[#2B2D42] mb-4">{content.completedMessage}</p>
              <Button 
                onClick={handleMarkCompleted}
                className="bg-[#6C63FF] hover:bg-[#5A54E6] text-white px-6 py-2 rounded-xl"
                data-testid="button-mark-completed"
              >
                {content.markCompleted}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storybook;