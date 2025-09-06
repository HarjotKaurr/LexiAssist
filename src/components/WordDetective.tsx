import React, { useState } from 'react';
import { useTest } from '../context/TestContext';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const wordPairs = [
  { correct: "friend", wrong: "freind" },
  { correct: "because", wrong: "becuase" },
  { correct: "beautiful", wrong: "beatiful" },
  { correct: "tomorrow", wrong: "tommorow" },
  { correct: "receive", wrong: "recieve" },
  { correct: "different", wrong: "diffrent" }
];

const WordDetective: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  const translations = {
    english: {
      title: "Word Detective Challenge",
      instruction: "Click on the correctly spelled word",
      progress: "Question",
      of: "of",
      completed: "Challenge Completed!",
      processing: "Processing results...",
      backHome: "Back to Home",
      instructions: "Click on the word you think is spelled correctly"
    },
    hindi: {
      title: "वर्ड डिटेक्टिव चुनौती",
      instruction: "सही वर्तनी वाले शब्द पर क्लिक करें",
      progress: "प्रश्न",
      of: "में से",
      completed: "चुनौती पूर्ण!",
      processing: "परिणाम प्रोसेस किए जा रहे हैं...",
      backHome: "होम पर वापस",
      instructions: "जो शब्द आपको लगता है कि सही वर्तनी में है उस पर क्लिक करें"
    },
    tamil: {
      title: "வார்த்தை துப்பறியும் சவால்",
      instruction: "சரியாக எழுதப்பட்ட வார்த்தையில் கிளிக் செய்யுங்கள்",
      progress: "கேள்வி",
      of: "இல்",
      completed: "சவால் முடிந்தது!",
      processing: "முடிவுகள் செயலாக்கப்படுகின்றன...",
      backHome: "முகப்புக்கு திரும்பு",
      instructions: "சரியான எழுத்துப்பிழை என்று நீங்கள் நினைக்கும் வார்த்தையைக் கிளிக் செய்யுங்கள்"
    }
  };

  const content = translations[preferredLanguage];
  const currentPair = wordPairs[currentIndex];

  const handleWordClick = (clickedWord: string, isCorrect: boolean) => {
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(nextScore);
    }

    if (currentIndex < wordPairs.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Test completed
      const timeSpent = (Date.now() - startTime) / 1000;
      setIsFinished(true);
      
      // Complete the test with results
      setTimeout(() => {
        completeTest('wordDetective', {
          score: nextScore,
          totalQuestions: wordPairs.length,
          timeSpent
        });
        navigate('/results');
      }, 2000);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef7cd]/50 p-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#2B2D42]">{content.completed}</h2>
          <p className="text-lg text-[#555770] mb-6">{content.processing}</p>
          <div className="animate-spin w-8 h-8 border-4 border-[#6C63FF] border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Randomly position words (left/right)
  const wordsOrder = Math.random() > 0.5 ? 
    [{ word: currentPair.correct, isCorrect: true }, { word: currentPair.wrong, isCorrect: false }] :
    [{ word: currentPair.wrong, isCorrect: false }, { word: currentPair.correct, isCorrect: true }];

  return (
    <div className="min-h-screen bg-[#fef7cd]/50 p-4">
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={handleGoHome}
            data-testid="button-back-home"
            className="absolute top-4 left-4 text-[#6C63FF] hover:bg-[#6C63FF]/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {content.backHome}
          </Button>
          
          <h1 className="text-4xl font-bold mb-4 text-[#2B2D42]">{content.title}</h1>
          <p className="text-lg text-[#555770] mb-4">{content.instruction}</p>
          <div className="text-sm text-[#6C63FF]">
            {content.progress} {currentIndex + 1} {content.of} {wordPairs.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8" data-testid="progress-bar">
          <div 
            className="h-2 rounded-full bg-[#6C63FF] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / wordPairs.length) * 100}%` }}
            data-testid="progress-fill"
          ></div>
        </div>

        {/* Word Selection */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          {wordsOrder.map((item, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(item.word, item.isCorrect)}
              data-testid={`button-word-${item.word}`}
              className="bg-white rounded-3xl shadow-lg p-12 border-2 border-[#CADCFC] 
                       hover:scale-105 hover:shadow-xl transition-all duration-300
                       text-3xl font-bold text-[#2B2D42] hover:border-[#6C63FF]/50"
            >
              {item.word}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#555770]" data-testid="text-instructions">
            {content.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordDetective;