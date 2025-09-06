import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import LetterMatch from '../components/LetterMatch';
import WordDetective from '../components/WordDetective';
import Storybook from '../components/Storybook';

const Screening: React.FC = () => {
  const { currentTest, startTest, isTestCompleted, preferredLanguage } = useTest();
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  
  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };
  
  const isLetterMatchCompleted = isTestCompleted('letterMatch');
  const isStorybookCompleted = isTestCompleted('storybook');
  const isWordDetectiveCompleted = isTestCompleted('wordDetective');
  const areAllTestsCompleted = isLetterMatchCompleted && isStorybookCompleted && isWordDetectiveCompleted;
  
  const translations = {
    english: {
      title: "Dyslexia Screening",
      subtitle: "Complete the following tests to help identify potential reading challenges.",
      timeEstimate: "The entire process takes about 7 minutes.",
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
        storybook: {
          title: "Storybook Challenge",
          description: "Interactive stories that help improve reading comprehension and engagement.",
          duration: "3 minutes"
        },
        wordDetective: {
          title: "Word Detective Challenge",
          description: "Find the correctly spelled words to test your spelling recognition skills.",
          duration: "2 minutes"
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
      timeEstimate: "पूरी प्रक्रिया में लगभग 7 मिनट लगते हैं।",
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
        storybook: {
          title: "स्टोरीबुक चुनौती",
          description: "इंटरैक्टिव कहानियाँ जो पढ़ने की समझ और जुड़ाव में सुधार करने में मदद करती हैं।",
          duration: "3 मिनट"
        },
        wordDetective: {
          title: "वर्ड डिटेक्टिव चुनौती",
          description: "अपने वर्तनी पहचान कौशल का परीक्षण करने के लिए सही वर्तनी वाले शब्दों को खोजें।",
          duration: "2 मिनट"
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
      timeEstimate: "முழு செயல்முறையும் சுமார் 7 நிமிடங்கள் ஆகும்.",
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
        storybook: {
          title: "கதைப்புத்தக சவால்",
          description: "வாசிப்புத் திறன் மற்றும் ஈடுபாட்டை மேம்படுத்த உதவும் ஊடாடும் கதைகள்.",
          duration: "3 நிமிடங்கள்"
        },
        wordDetective: {
          title: "வார்த்தை துப்பறியும் சவால்",
          description: "உங்கள் எழுத்துப்பிழை அடையாளம் கண்டுகொள்ளும் திறமையை சோதிக்க சரியாக எழுதப்பட்ட வார்த்தைகளைக் கண்டறியுங்கள்.",
          duration: "2 நிமிடங்கள்"
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
  
  const handleTestStart = (testType: 'letterMatch' | 'storybook' | 'wordDetective') => {
    if (testType === 'letterMatch') {
      startTest('letterMatch');
      setHasStarted(true);
    } else if (testType === 'storybook') {
      navigate('/storybook');
    } else if (testType === 'wordDetective') {
      navigate('/word-detective');
    }
  };
  
  // If a test is currently running, show the test component
  if (currentTest === 'letterMatch' && hasStarted) {
    return <LetterMatch />;
  }

  const getTestStatus = (testType: 'letterMatch' | 'storybook' | 'wordDetective') => {
    if (isTestCompleted(testType)) {
      return 'completed';
    }
    return 'available';
  };

  const getButtonText = (testType: 'letterMatch' | 'storybook' | 'wordDetective') => {
    const status = getTestStatus(testType);
    return content.status[status];
  };

  const isButtonDisabled = (testType: 'letterMatch' | 'storybook' | 'wordDetective') => {
    return false; // All tests are available from the start
  };

  const getButtonStyles = (testType: 'letterMatch' | 'storybook' | 'wordDetective') => {
    const status = getTestStatus(testType);
    const baseStyles = "w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ";
    
    if (status === 'completed') {
      return baseStyles + "bg-green-500 text-white border-2 border-green-500";
    } else if (status === 'available') {
      return baseStyles + "bg-[#6C63FF] text-white hover:bg-[#5A52E8] border-2 border-[#6C63FF]";
    } else {
      return baseStyles + "bg-gray-300 text-gray-500 border-2 border-gray-300 cursor-not-allowed";
    }
  };

  return (
    <div className="min-h-screen bg-[#fef7cd]/50">
      <div style={mainContentStyle}>
        {/* Header */}
        <div className="text-center mb-8 pt-20">
          <h1 className="text-4xl font-bold mb-4 text-[#2B2D42]">{content.title}</h1>
          <p className="text-lg text-[#555770] mb-2 max-w-3xl">{content.subtitle}</p>
          <p className="text-base text-[#6C63FF]">{content.timeEstimate}</p>
        </div>

        {/* All Tests Completed */}
        {areAllTestsCompleted && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 text-center max-w-2xl w-full border-2 border-green-200">
            <h2 className="text-3xl font-bold mb-4 text-green-600">{content.allCompleted}</h2>
            <p className="text-lg text-[#555770] mb-6">{content.completedMessage}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/results" 
                className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                {content.viewResults}
              </Link>
              <Link 
                to="/" 
                className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
              >
                {content.returnHome}
              </Link>
            </div>
          </div>
        )}

        {/* Test Cards */}
        <div className="grid gap-6 w-full max-w-4xl mb-8">
          {/* Letter Match Test */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-[#CADCFC] hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-[#2B2D42]">{content.tests.letterMatch.title}</h3>
                <p className="text-base text-[#555770] mb-3">{content.tests.letterMatch.description}</p>
                <div className="text-sm text-[#6C63FF] mb-4">⏱️ {content.tests.letterMatch.duration}</div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleTestStart('letterMatch')}
                  disabled={isButtonDisabled('letterMatch')}
                  className={getButtonStyles('letterMatch')}
                  data-testid="button-start-letter-match"
                >
                  {getButtonText('letterMatch')}
                </button>
              </div>
            </div>
          </div>

          {/* Storybook Challenge */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-[#CADCFC] hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-[#2B2D42]">{content.tests.storybook.title}</h3>
                <p className="text-base text-[#555770] mb-3">{content.tests.storybook.description}</p>
                <div className="text-sm text-[#6C63FF] mb-4">⏱️ {content.tests.storybook.duration}</div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleTestStart('storybook')}
                  disabled={isButtonDisabled('storybook')}
                  className={getButtonStyles('storybook')}
                  data-testid="button-start-storybook"
                >
                  {getButtonText('storybook')}
                </button>
              </div>
            </div>
          </div>

          {/* Word Detective Challenge */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-[#CADCFC] hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-[#2B2D42]">{content.tests.wordDetective.title}</h3>
                <p className="text-base text-[#555770] mb-3">{content.tests.wordDetective.description}</p>
                <div className="text-sm text-[#6C63FF] mb-4">⏱️ {content.tests.wordDetective.duration}</div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleTestStart('wordDetective')}
                  disabled={isButtonDisabled('wordDetective')}
                  className={getButtonStyles('wordDetective')}
                  data-testid="button-start-word-detective"
                >
                  {getButtonText('wordDetective')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#6C63FF] hover:text-[#5A52E8] font-semibold transition-colors duration-200"
          >
            ← {content.returnHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Screening;