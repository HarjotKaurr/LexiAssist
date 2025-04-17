import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import LetterMatch from '../components/LetterMatch';
import WordSpeed from '../components/WordSpeed';
import VisualFocus from '../components/VisualFocus';

const Screening: React.FC = () => {
  const { currentTest, startTest, isTestCompleted, preferredLanguage } = useTest();
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  
  const isLetterMatchCompleted = isTestCompleted('letterMatch');
  const isWordSpeedCompleted = isTestCompleted('wordSpeed');
  const isVisualFocusCompleted = isTestCompleted('visualFocus');
  const areAllTestsCompleted = isLetterMatchCompleted && isWordSpeedCompleted && isVisualFocusCompleted;
  
  const translations = {
    english: {
      title: "Dyslexia Screening",
      subtitle: "Complete the following tests to help identify potential reading challenges.",
      timeEstimate: "The entire process takes about 5 minutes.",
      allCompleted: "All Tests Completed!",
      completedMessage: "Thank you for completing the screening. You can now view your results and personalized recommendations.",
      viewResults: "View My Results",
      returnHome: "Return to Home",
      tests: {
        letterMatch: {
          title: "Letter Matching Test",
          description: "This test helps identify if you have difficulty distinguishing between similar-looking letters.",
          duration: "2 minutes"
        },
        wordSpeed: {
          title: "Word Speed Challenge",
          description: "This test measures how quickly and accurately you can read and process words.",
          duration: "2 minutes"
        },
        visualFocus: {
          title: "Visual Focus Game",
          description: "This fun game helps check how well your eyes can track and focus on moving objects.",
          duration: "1 minute"
        }
      },
      status: {
        available: "Start Test",
        completed: "Completed",
        locked: "Locked"
      }
    },
    hindi: {
      title: "डिस्लेक्सिया स्क्रीनिंग",
      subtitle: "संभावित पढ़ने की चुनौतियों की पहचान करने में मदद के लिए निम्नलिखित परीक्षण पूरा करें।",
      timeEstimate: "पूरी प्रक्रिया में लगभग 5 मिनट लगते हैं।",
      allCompleted: "सभी परीक्षण पूरे हुए!",
      completedMessage: "स्क्रीनिंग पूरी करने के लिए धन्यवाद। अब आप अपने परिणाम और व्यक्तिगत सिफारिशें देख सकते हैं।",
      viewResults: "मेरे परिणाम देखें",
      returnHome: "होम पर वापस जाएं",
      tests: {
        letterMatch: {
          title: "अक्षर मिलान परीक्षण",
          description: "यह परीक्षण यह पहचानने में मदद करता है कि क्या आपको समान दिखने वाले अक्षरों के बीच अंतर करने में कठिनाई होती है।",
          duration: "2 मिनट"
        },
        wordSpeed: {
          title: "शब्द गति चुनौती",
          description: "यह परीक्षण मापता है कि आप कितनी जल्दी और सटीक रूप से शब्दों को पढ़ और प्रोसेस कर सकते हैं।",
          duration: "2 मिनट"
        },
        visualFocus: {
          title: "दृश्य फोकस खेल",
          description: "यह मजेदार खेल यह जांचने में मदद करता है कि आपकी आंखें चलती वस्तुओं को कितनी अच्छी तरह ट्रैक और फोकस कर सकती हैं।",
          duration: "1 मिनट"
        }
      },
      status: {
        available: "परीक्षण शुरू करें",
        completed: "पूरा हुआ",
        locked: "लॉक्ड"
      }
    },
    tamil: {
      title: "டிஸ்லெக்சியா திரையிடல்",
      subtitle: "சாத்தியமான வாசிப்பு சவால்களை அடையாளம் காண உதவ பின்வரும் சோதனைகளை முடிக்கவும்.",
      timeEstimate: "முழு செயல்முறையும் சுமார் 5 நிமிடங்கள் ஆகும்.",
      allCompleted: "அனைத்து சோதனைகளும் முடிந்தன!",
      completedMessage: "திரையிடலை முடித்ததற்கு நன்றி. இப்போது உங்கள் முடிவுகளையும் தனிப்பயனாக்கப்பட்ட பரிந்துரைகளையும் காணலாம்.",
      viewResults: "என் முடிவுகளைக் காண்க",
      returnHome: "முகப்புக்குத் திரும்பு",
      tests: {
        letterMatch: {
          title: "எழுத்து பொருத்தும் சோதனை",
          description: "இந்த சோதனை ஒத்த தோற்றமுள்ள எழுத்துக்களை வேறுபடுத்துவதில் உங்களுக்கு சிரமம் உள்ளதா என்பதை அடையாளம் காண உதவுகிறது.",
          duration: "2 நிமிடங்கள்"
        },
        wordSpeed: {
          title: "சொல் வேக சவால்",
          description: "இந்த சோதனை நீங்கள் எவ்வளவு விரைவாகவும் துல்லியமாகவும் சொற்களை வாசித்து செயலாக்க முடியும் என்பதை அளவிடுகிறது.",
          duration: "2 நிமிடங்கள்"
        },
        visualFocus: {
          title: "காட்சி கவன விளையாட்டு",
          description: "இந்த வேடிக்கையான விளையாட்டு உங்கள் கண்கள் நகரும் பொருட்களை எவ்வளவு நன்றாகக் கண்காணிக்கவும் கவனம் செலுத்தவும் முடியும் என்பதை சரிபார்க்க உதவுகிறது.",
          duration: "1 நிமிடம்"
        }
      },
      status: {
        available: "சோதனையைத் தொடங்கவும்",
        completed: "முடிந்தது",
        locked: "பூட்டப்பட்டது"
      }
    }
  };
  
  const content = translations[preferredLanguage];
  
  const handleStartTest = (test: 'letterMatch' | 'wordSpeed' | 'visualFocus') => {
    setHasStarted(true);
    startTest(test);
  };
  
  const handleViewResults = () => {
    navigate('/results');
  };
  
  if (currentTest === 'letterMatch') {
    return <LetterMatch />;
  }
  
  if (currentTest === 'wordSpeed') {
    return <WordSpeed />;
  }
  
  if (currentTest === 'visualFocus') {
    return <VisualFocus />;
  }
  
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 text-[#2B2D42] font-dyslexic">{content.title}</h1>
            <p className="text-lg text-[#6C63FF] mb-2">
              {content.subtitle}
            </p>
            <p className="text-sm text-[#555770] mt-2 mb-8">
              {content.timeEstimate}
            </p>
          </div>
          
          {areAllTestsCompleted ? (
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300/50 rounded-lg p-8 text-center animate-scale-in">
              <h2 className="text-2xl font-semibold mb-2 font-dyslexic text-[#2B2D42]">{content.allCompleted}</h2>
              <p className="mb-6 text-[#555770]">
                {content.completedMessage}
              </p>
              <button
                onClick={handleViewResults}
                className="bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-dyslexic shadow-lg transition"
              >
                {content.viewResults}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <TestCard
                title={content.tests.letterMatch.title}
                description={content.tests.letterMatch.description}
                duration={content.tests.letterMatch.duration}
                status={isLetterMatchCompleted ? 'completed' : 'available'}
                statusText={isLetterMatchCompleted ? content.status.completed : content.status.available}
                onClick={() => handleStartTest('letterMatch')}
                bgColor="bg-gradient-to-r from-orange-50 to-orange-100"
              />
              
              <TestCard
                title={content.tests.wordSpeed.title}
                description={content.tests.wordSpeed.description}
                duration={content.tests.wordSpeed.duration}
                status={isLetterMatchCompleted ? (isWordSpeedCompleted ? 'completed' : 'available') : 'locked'}
                statusText={isLetterMatchCompleted ? 
                  (isWordSpeedCompleted ? content.status.completed : content.status.available) 
                  : content.status.locked}
                onClick={() => handleStartTest('wordSpeed')}
                bgColor="bg-gradient-to-r from-orange-100 to-orange-200"
              />
              
              <TestCard
                title={content.tests.visualFocus.title}
                description={content.tests.visualFocus.description}
                duration={content.tests.visualFocus.duration}
                status={isWordSpeedCompleted ? (isVisualFocusCompleted ? 'completed' : 'available') : 'locked'}
                statusText={isWordSpeedCompleted ? 
                  (isVisualFocusCompleted ? content.status.completed : content.status.available) 
                  : content.status.locked}
                onClick={() => handleStartTest('visualFocus')}
                bgColor="bg-gradient-to-r from-orange-200 to-orange-300"
              />
            </div>
          )}
          
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/" className="text-[#6C63FF] hover:underline font-dyslexic">
              {content.returnHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestCardProps {
  title: string;
  description: string;
  duration: string;
  status: 'available' | 'locked' | 'completed';
  statusText: string;
  onClick: () => void;
  bgColor?: string;
}

const TestCard: React.FC<TestCardProps> = ({
  title,
  description,
  duration,
  status,
  statusText,
  onClick,
  bgColor = 'bg-white',
}) => {
  return (
    <div className={`rounded-lg shadow-sm border ${
      status === 'completed' 
        ? 'border-green-200' 
        : status === 'locked' 
          ? 'border-gray-200 opacity-70' 
          : 'border-primary/20'
    } p-6 card-hover ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2 font-dyslexic">{title}</h3>
          <p className="text-muted-foreground mb-2">{description}</p>
          <p className="text-sm text-primary/80">{duration}</p>
        </div>
        <div>
          {status === 'completed' ? (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {statusText}
            </div>
          ) : status === 'locked' ? (
            <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
              {statusText}
            </div>
          ) : (
            <button
              onClick={onClick}
              className="btn-primary font-dyslexic"
            >
              {statusText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Screening;
