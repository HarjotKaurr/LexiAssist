import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { Award, BookOpen, Brain, Lightbulb, Sparkles } from 'lucide-react';

const Results: React.FC = () => {
  const { testResults, resetTests, preferredLanguage } = useTest();
  const navigate = useNavigate();
  
  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };
  
  const letterMatchResults = testResults.letterMatch;
  const storybookResults = testResults.storybook;
  const wordDetectiveResults = testResults.wordDetective;
  
  const hasResults = letterMatchResults && storybookResults && wordDetectiveResults;
  
  const translations = {
    english: {
      title: "Your Screening Results",
      subtitle: "Based on your performance in the screening tests, we've generated these insights.",
      disclaimer: "Note: This is not a clinical diagnosis. For a formal assessment, please consult with a healthcare professional.",
      noResults: "No Results Yet",
      noResultsMessage: "You haven't completed the screening tests yet. Complete all tests to see your results.",
      goToScreening: "Go to Screening",
      riskAssessment: "Learning Profile",
      letterMatchResults: "Letter Matching Results",
      storybookResults: "Story Comprehension Results",
      wordDetectiveResults: "Word Recognition Results",
      accuracy: "Accuracy",
      timeSpent: "Time Spent",
      comprehensionScore: "Comprehension Score",
      recognitionScore: "Recognition Score",
      questionsCorrect: "Questions Correct",
      totalQuestions: "Total Questions",
      challengingAreas: "Challenging Areas",
      recommendations: "Personalized Recommendations",
      takeTestAgain: "Take Test Again",
      returnHome: "Return Home",
      seconds: "seconds",
      riskLevels: {
        low: "Typically Developing",
        medium: "Some Learning Differences",
        high: "Significant Learning Differences"
      },
      strengthsTitle: "Your Strengths",
      learningStyle: "Learning Style",
      styles: {
        visual: "Visual Learner",
        auditory: "Auditory Learner",
        mixed: "Mixed Learning Style"
      }
    },
    hindi: {
      title: "आपके स्क्रीनिंग परिणाम",
      subtitle: "स्क्रीनिंग परीक्षणों में आपके प्रदर्शन के आधार पर, हमने ये अंतर्दृष्टि उत्पन्न की हैं।",
      disclaimer: "नोट: यह एक नैदानिक निदान नहीं है। औपचारिक मूल्यांकन के लिए, कृपया स्वास्थ्य देखभाल पेशेवर से परामर्श करें।",
      noResults: "अभी तक कोई परिणाम नहीं",
      noResultsMessage: "आपने अभी तक स्क्रीनिंग परीक्षण पूरा नहीं किया है। अपने परिणाम देखने के लिए सभी परीक्षण पूरे करें।",
      goToScreening: "स्क्रीनिंग पर जाएं",
      riskAssessment: "लर्निंग प्रोफाइल",
      letterMatchResults: "अक्षर मिलान परिणाम",
      storybookResults: "कहानी समझ परिणाम",
      wordDetectiveResults: "शब्द पहचान परिणाम",
      accuracy: "सटीकता",
      timeSpent: "बिताया गया समय",
      comprehensionScore: "समझ स्कोर",
      recognitionScore: "पहचान स्कोर",
      questionsCorrect: "सही उत्तर",
      totalQuestions: "कुल प्रश्न",
      challengingAreas: "चुनौतीपूर्ण क्षेत्र",
      recommendations: "व्यक्तिगत सिफारिशें",
      takeTestAgain: "परीक्षण फिर से लें",
      returnHome: "होम पर वापस जाएं",
      seconds: "सेकंड",
      riskLevels: {
        low: "सामान्य रूप से विकसित",
        medium: "कुछ सीखने की विभिन्नताएं",
        high: "महत्वपूर्ण सीखने की विभिन्नताएं"
      },
      strengthsTitle: "आपकी ताकत",
      learningStyle: "सीखने की शैली",
      styles: {
        visual: "दृश्य शिक्षार्थी",
        auditory: "श्रवण शिक्षार्थी",
        mixed: "मिश्रित सीखने की शैली"
      }
    },
    tamil: {
      title: "உங்கள் திரையிடல் முடிவுகள்",
      subtitle: "திரையிடல் சோதனைகளில் உங்கள் செயல்திறனின் அடிப்படையில், இந்த அறிவுகளை உருவாக்கியுள்ளோம்.",
      disclaimer: "குறிப்பு: இது ஒரு மருத்துவ கண்டறிதல் அல்ல. முறையான மதிப்பீட்டிற்கு, ஒரு சுகாதார நிபுணரை அணுகவும்.",
      noResults: "இன்னும் முடிவுகள் இல்லை",
      noResultsMessage: "நீங்கள் இன்னும் திரையிடல் சோதனைகளை முடிக்கவில்லை. உங்கள் முடிவுகளைக் காண அனைத்து சோதனைகளையும் முடிக்கவும்.",
      goToScreening: "திரையிடலுக்குச் செல்லவும்",
      riskAssessment: "கற்றல் சுயவிவரம்",
      letterMatchResults: "எழுத்து பொருத்தும் முடிவுகள்",
      storybookResults: "கதை புரிதல் முடிவுகள்",
      wordDetectiveResults: "சொல் அடையாளம் முடிவுகள்",
      accuracy: "துல்லியம்",
      timeSpent: "செலவழித்த நேரம்",
      comprehensionScore: "புரிதல் மதிப்பெண்",
      recognitionScore: "அடையாளம் மதிப்பெண்",
      questionsCorrect: "சரியான கேள்விகள்",
      totalQuestions: "மொத்த கேள்விகள்",
      challengingAreas: "சவாலான பகுதிகள்",
      recommendations: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்",
      takeTestAgain: "மீண்டும் சோதனை எடுக்கவும்",
      returnHome: "முகப்புக்குத் திரும்பு",
      seconds: "விநாடிகள்",
      riskLevels: {
        low: "பொதுவாக வளர்ந்து வருகிறது",
        medium: "சில கற்றல் வேறுபாடுகள்",
        high: "குறிப்பிடத்தக்க கற்றல் வேறுபாடுகள்"
      },
      strengthsTitle: "உங்கள் பலங்கள்",
      learningStyle: "கற்றல் பாணி",
      styles: {
        visual: "காட்சி கற்பவர்",
        auditory: "கேட்கும் கற்பவர்",
        mixed: "கலப்பு கற்றல் பாணி"
      }
    }
  };
  
  const content = translations[preferredLanguage];
  
  const calculateRiskLevel = () => {
    if (!hasResults) return 'unknown';
    
    const letterMatchScore = 
      (letterMatchResults?.correctAnswers || 0) / 
      (letterMatchResults?.totalQuestions || 1);
    
    const storybookScore = (storybookResults?.score || 0) / (storybookResults?.totalQuestions || 1);
    const wordDetectiveScore = (wordDetectiveResults?.score || 0) / (wordDetectiveResults?.totalQuestions || 1);
    
    const avgScore = (letterMatchScore + storybookScore + wordDetectiveScore) / 3;
    
    if (avgScore > 0.85) return 'low';
    if (avgScore > 0.65) return 'medium';
    return 'high';
  };
  
  const riskLevel = calculateRiskLevel();
  
  const determineLearningStyle = () => {
    if (!hasResults) return 'mixed';
    
    const letterMatchScore = 
      (letterMatchResults?.correctAnswers || 0) / 
      (letterMatchResults?.totalQuestions || 1) * 100;
    
    const storybookScore = (storybookResults?.score || 0) / (storybookResults?.totalQuestions || 1) * 100;
    
    if (letterMatchScore > 85 && storybookScore > 80) {
      return 'visual';
    } else if (wordDetectiveResults?.score && (wordDetectiveResults.score / wordDetectiveResults.totalQuestions) > 0.8) {
      return 'auditory';
    }
    
    return 'mixed';
  };
  
  const learningStyle = determineLearningStyle();
  
  const getStrengths = () => {
    if (!hasResults) return [];
    
    const strengths = [];
    
    if (letterMatchResults?.correctAnswers && letterMatchResults.correctAnswers > (letterMatchResults.totalQuestions * 0.8)) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Good at recognizing letter shapes' 
        : preferredLanguage === 'hindi'
          ? 'अक्षर आकारों को पहचानने में अच्छे'
          : 'எழுத்து வடிவங்களை அடையாளம் காண்பதில் நல்லது');
    }
    
    if (storybookResults?.score && (storybookResults.score / storybookResults.totalQuestions) > 0.8) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Good story comprehension skills' 
        : preferredLanguage === 'hindi'
          ? 'अच्छी कहानी समझ कौशल'
          : 'நல்ல கதை புரிதல் திறன்');
    }
    
    if (wordDetectiveResults?.score && (wordDetectiveResults.score / wordDetectiveResults.totalQuestions) > 0.8) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Strong word recognition abilities' 
        : preferredLanguage === 'hindi'
          ? 'मजबूत शब्द पहचान क्षमता'
          : 'வலுவான சொல் அடையாள திறன்');
    }
    
    if (storybookResults?.timeSpent && storybookResults.timeSpent < 120) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Quick processing of stories' 
        : preferredLanguage === 'hindi'
          ? 'कहानियों की त्वरित प्रसंस्करण'
          : 'கதைகளின் விரைவான செயலாக்கம்');
    }
    
    if (wordDetectiveResults?.timeSpent && wordDetectiveResults.timeSpent < 120) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Quick word identification' 
        : preferredLanguage === 'hindi'
          ? 'त्वरित शब्द पहचान'
          : 'விரைவான சொல் அடையாளம்');
    }
    
    // Add at least one strength if none found
    if (strengths.length === 0) {
      strengths.push(preferredLanguage === 'english' 
        ? 'Completed all tests successfully' 
        : preferredLanguage === 'hindi'
          ? 'सभी परीक्षण सफलतापूर्वक पूरे किए'
          : 'அனைத்து சோதனைகளையும் வெற்றிகரமாக முடித்தார்');
    }
    
    return strengths;
  };
  
  const getRecommendations = () => {
    if (!hasResults) return [];
    
    const recommendations = [];
    
    // Common recommendations for all risk levels
    recommendations.push(preferredLanguage === 'english' 
      ? 'Read for 15 minutes every day with a parent or teacher' 
      : preferredLanguage === 'hindi'
        ? 'माता-पिता या शिक्षक के साथ हर दिन 15 मिनट पढ़ें'
        : 'ஒரு பெற்றோர் அல்லது ஆசிரியருடன் ஒவ்வொரு நாளும் 15 நிமிடங்கள் படிக்கவும்');
    
    // Based on letter matching results
    if (letterMatchResults?.correctAnswers && letterMatchResults.correctAnswers < (letterMatchResults.totalQuestions * 0.7)) {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Practice letter recognition games with flashcards' 
        : preferredLanguage === 'hindi'
          ? 'फ्लैशकार्ड के साथ अक्षर पहचान खेल का अभ्यास करें'
          : 'ஃபிளாஷ்கார்டுகளுடன் எழுத்து அங்கீகார விளையாட்டுகளை பயிற்சி செய்யுங்கள்');
    }
    
    // Based on storybook results
    if (storybookResults?.score && (storybookResults.score / storybookResults.totalQuestions) < 0.7) {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Practice reading stories with picture support' 
        : preferredLanguage === 'hindi'
          ? 'तस्वीरों के साथ कहानियां पढ़ने का अभ्यास करें'
          : 'படங்கள் அடைப்பியான கதைகளைப் படிக்கப் பயிற்சி செய்யுங்கள்');
    }
    
    // Based on word detective results
    if (wordDetectiveResults?.score && (wordDetectiveResults.score / wordDetectiveResults.totalQuestions) < 0.7) {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Practice word recognition games and sight word activities' 
        : preferredLanguage === 'hindi'
          ? 'शब्द पहचान खेल और दृश्य शब्द गतिविधियों का अभ्यास करें'
          : 'சொல் அடையாள விளையாட்டுகள் மற்றும் காட்சி வார்த்தை செயல்பாடுகளின் பயிற்சியைப் பண்येவும்');
    }
    
    // Based on learning style
    if (learningStyle === 'visual') {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Use colorful highlighters to mark important words' 
        : preferredLanguage === 'hindi'
          ? 'महत्वपूर्ण शब्दों को चिह्नित करने के लिए रंगीन हाइलाइटर का उपयोग करें'
          : 'முக்கியமான வார்த்தைகளைக் குறிக்க வண்ணமயமான ஹைலைட்டர்களைப் பயன்படுத்தவும்');
    } else if (learningStyle === 'auditory') {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Record yourself reading and listen to it' 
        : preferredLanguage === 'hindi'
          ? 'अपने आप को पढ़ते हुए रिकॉर्ड करें और उसे सुनें'
          : 'நீங்கள் படிப்பதைப் பதிவுசெய்து அதைக் கேளுங்கள்');
    }
    
    // Add risk-level specific recommendations
    if (riskLevel === 'high') {
      recommendations.push(preferredLanguage === 'english' 
        ? 'Consider consulting with a learning specialist' 
        : preferredLanguage === 'hindi'
          ? 'एक लर्निंग स्पेशलिस्ट से परामर्श करने पर विचार करें'
          : 'ஒரு கற்றல் நிபுணரை ஆலோசிக்க பரிசீலிக்கவும்');
    }
    
    return recommendations;
  };
  
  const handleStartOver = () => {
    resetTests();
    navigate('/screening');
  };
  
  if (!hasResults) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center animate-fade-in">
            <h1 className="text-2xl font-bold mb-4 font-dyslexic">{content.noResults}</h1>
            <p className="text-muted-foreground mb-6">
              {content.noResultsMessage}
            </p>
            <Link to="/screening" className="btn-primary font-dyslexic">
              {content.goToScreening}
            </Link>
          </div>
        </div>
      </div>
    );
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
            <p className="text-sm text-[#555770] mb-8">
              {content.disclaimer}
            </p>
          </div>
          
          <div className="grid gap-8 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow-sm p-6 border-2 border-orange-200/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold mb-4 font-dyslexic text-[#2B2D42]">{content.riskAssessment}</h2>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                  riskLevel === 'low' 
                    ? 'bg-green-100 text-green-700' 
                    : riskLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}>
                  <span className="text-lg font-medium">
                    {riskLevel === 'low' ? '😊' : riskLevel === 'medium' ? '🤔' : '🧠'}
                  </span>
                </div>
                <span className="text-lg font-medium capitalize">
                  {content.riskLevels[riskLevel]}
                </span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3 font-dyslexic">{content.strengthsTitle}</h3>
                <ul className="space-y-2">
                  {getStrengths().map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-700 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                        ✓
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2 font-dyslexic">{content.learningStyle}</h3>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <div className="flex items-center">
                    {learningStyle === 'visual' ? (
                      <Brain className="text-primary mr-2" size={20} />
                    ) : learningStyle === 'auditory' ? (
                      <Sparkles className="text-primary mr-2" size={20} />
                    ) : (
                      <Lightbulb className="text-primary mr-2" size={20} />
                    )}
                    <span className="font-medium">{content.styles[learningStyle]}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-orange-100/80 to-orange-200/80 rounded-xl shadow-sm p-6 border-2 border-orange-200/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-lg font-semibold mb-4 font-dyslexic text-[#2B2D42]" data-testid="letter-match-results-title">{content.letterMatchResults}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.accuracy}</span>
                    <span className="font-medium" data-testid="letter-match-accuracy">
                      {letterMatchResults ? `${Math.round((letterMatchResults.correctAnswers / letterMatchResults.totalQuestions) * 100)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.timeSpent}</span>
                    <span className="font-medium" data-testid="letter-match-time">
                      {letterMatchResults ? `${letterMatchResults.timeSpent.toFixed(1)} ${content.seconds}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.questionsCorrect}</span>
                    <span className="font-medium" data-testid="letter-match-score">
                      {letterMatchResults ? `${letterMatchResults.correctAnswers}/${letterMatchResults.totalQuestions}` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-200/80 to-orange-300/80 rounded-xl shadow-sm p-6 border-2 border-orange-200/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-lg font-semibold mb-4 font-dyslexic text-[#2B2D42]" data-testid="storybook-results-title">{content.storybookResults}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.comprehensionScore}</span>
                    <span className="font-medium" data-testid="storybook-score">
                      {storybookResults ? `${storybookResults.score}/${storybookResults.totalQuestions}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.timeSpent}</span>
                    <span className="font-medium" data-testid="storybook-time">
                      {storybookResults ? `${storybookResults.timeSpent.toFixed(1)} ${content.seconds}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.questionsCorrect}</span>
                    <span className="font-medium" data-testid="storybook-accuracy">
                      {storybookResults ? `${Math.round((storybookResults.score / storybookResults.totalQuestions) * 100)}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-300/80 to-orange-400/80 rounded-xl shadow-sm p-6 border-2 border-orange-200/30 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-lg font-semibold mb-4 font-dyslexic text-[#2B2D42]" data-testid="word-detective-results-title">{content.wordDetectiveResults}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.recognitionScore}</span>
                    <span className="font-medium" data-testid="word-detective-score">
                      {wordDetectiveResults ? `${wordDetectiveResults.score}/${wordDetectiveResults.totalQuestions}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.timeSpent}</span>
                    <span className="font-medium" data-testid="word-detective-time">
                      {wordDetectiveResults ? `${wordDetectiveResults.timeSpent.toFixed(1)} ${content.seconds}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                    <span>{content.questionsCorrect}</span>
                    <span className="font-medium" data-testid="word-detective-accuracy">
                      {wordDetectiveResults ? `${Math.round((wordDetectiveResults.score / wordDetectiveResults.totalQuestions) * 100)}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl shadow-sm p-6 border-2 border-orange-200/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-xl font-semibold mb-4 font-dyslexic text-[#2B2D42]">{content.recommendations}</h2>
              <ul className="space-y-3">
                {getRecommendations().map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                      ✓
                    </span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <button onClick={handleStartOver} className="bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 text-white px-6 py-3 rounded-xl font-dyslexic shadow-lg transition">
              {content.takeTestAgain}
            </button>
            <Link to="/" className="bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-dyslexic shadow-lg transition">
              {content.returnHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
