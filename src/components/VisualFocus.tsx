import React, { useState, useEffect, useRef } from 'react';
import { useTest } from '../context/TestContext';

const VisualFocus: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTracking, setIsTracking] = useState(false);
  const [distractions, setDistractions] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const translations = {
    english: {
      title: "Visual Focus Challenge",
      instruction: "Follow the moving target with your eyes",
      startButton: "Start Test",
      seconds: "seconds",
      score: "Score",
      timeLeft: "Time Left",
      completed: "Test Completed!",
      processing: "Processing results...",
    },
    hindi: {
      title: "दृश्य फोकस चुनौती",
      instruction: "अपनी आंखों से चलते लक्ष्य का पालन करें",
      startButton: "परीक्षण शुरू करें",
      seconds: "सेकंड",
      score: "स्कोर",
      timeLeft: "शेष समय",
      completed: "परीक्षण पूरा हुआ!",
      processing: "परिणाम प्रोसेस किए जा रहे हैं...",
    },
    tamil: {
      title: "காட்சி கவன சவால்",
      instruction: "உங்கள் கண்களால் நகரும் இலக்கைப் பின்தொடரவும்",
      startButton: "சோதனையைத் தொடங்கவும்",
      seconds: "விநாடிகள்",
      score: "மதிப்பெண்",
      timeLeft: "மீதமுள்ள நேரம்",
      completed: "சோதனை முடிந்தது!",
      processing: "முடிவுகள் செயலாக்கப்படுகின்றன...",
    }
  };
  
  const content = translations[preferredLanguage];

  const moveTarget = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      const newX = Math.floor(Math.random() * (containerWidth - 60));
      const newY = Math.floor(Math.random() * (containerHeight - 60));
      
      setPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    if (isTracking) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTracking(false);
            
            // Calculate final score
            const finalScore = Math.min(100, Math.round((score / 15) * 100));
            
            completeTest('visualFocus', {
              focusScore: finalScore,
              attentionSpan: 30 - distractions * 2, // Approximate attention span
              distractionCount: distractions
            });
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const moveInterval = setInterval(moveTarget, 2000);
      
      return () => {
        clearInterval(timer);
        clearInterval(moveInterval);
      };
    }
  }, [isTracking, score, distractions, completeTest]);

  const handleTargetClick = () => {
    if (isTracking) {
      setScore((prev) => prev + 1);
      moveTarget();
    }
  };

  const handleStartTest = () => {
    setIsTracking(true);
    setScore(0);
    setTimeLeft(30);
    setDistractions(0);
    moveTarget();
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only count as distraction if clicking outside target and test is running
    if (isTracking && e.target !== targetRef.current) {
      setDistractions((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto pt-24 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 font-dyslexic">{content.title}</h2>
        <p className="text-muted-foreground">{content.instruction}</p>
      </div>
      
      {!isTracking && timeLeft > 0 ? (
        <div className="text-center">
          <button 
            onClick={handleStartTest}
            className="btn-primary text-lg py-4 px-8 font-dyslexic"
          >
            {content.startButton}
          </button>
        </div>
      ) : timeLeft === 0 ? (
        <div className="text-center bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-medium mb-2 font-dyslexic">{content.completed}</h3>
          <div className="animate-pulse-soft">{content.processing}</div>
        </div>
      ) : (
        <>
          <div 
            ref={containerRef} 
            className="relative bg-dyslexia-cream rounded-lg h-80 mb-4 border border-primary/10 overflow-hidden"
            onClick={handleContainerClick}
          >
            <div 
              ref={targetRef}
              className="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-md"
              style={{ left: `${position.x}px`, top: `${position.y}px` }}
              onClick={handleTargetClick}
            >
              👁️
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">{content.score}</div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">{content.timeLeft}</div>
              <div className="text-2xl font-bold">{timeLeft} <span className="text-sm font-normal">{content.seconds}</span></div>
            </div>
          </div>
          
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VisualFocus;
