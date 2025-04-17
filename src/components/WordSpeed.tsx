
import React, { useState, useEffect, useRef } from 'react';
import { useTest } from '../context/TestContext';

// Reduced to 20 words in total
const words = [
  'cat', 'dog', 'fish', 'bird', 'house', 'tree', 'car', 'book',
  'school', 'friend', 'water', 'light'
];

const difficultWords = [
  'through', 'thought', 'though', 'their', 'there', 'they\'re',
  'because', 'beautiful'
];

// Creating an array with exactly 20 words total
const allWords = [...words, ...difficultWords].sort(() => Math.random() - 0.5);

const WordSpeed: React.FC = () => {
  const { completeTest } = useTest();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = allWords[currentIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongWords((prev) => [...prev, currentWord]);
    }
    
    if (currentIndex < allWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput('');
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsFinished(true);
    const timeSpentInMinutes = (Date.now() - startTime) / 60000;
    const wordsPerMinute = Math.round(correctCount / timeSpentInMinutes);
    const accuracy = Math.round((correctCount / allWords.length) * 100);
    
    const difficultWordsIdentified = wrongWords.filter(word => 
      difficultWords.includes(word)
    );
    
    completeTest('wordSpeed', {
      wordsPerMinute,
      accuracy,
      difficultWords: difficultWordsIdentified
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto pt-24 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Word Speed Challenge</h2>
        <p className="text-muted-foreground">Type the word shown below as quickly as possible.</p>
      </div>
      
      {!isFinished ? (
        <>
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="text-center mb-6">
              <span className="text-4xl font-dyslexic">{currentWord}</span>
            </div>
            
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full p-3 border border-input rounded-md text-lg font-dyslexic focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type the word here..."
                autoComplete="off"
                autoFocus
              />
              <button
                onClick={checkAnswer}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-1.5 px-4"
              >
                Next
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Words: {currentIndex} / {allWords.length}
            </div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary rounded-full h-2.5 transition-all duration-300"
                style={{ width: `${(currentIndex / allWords.length) * 100}%` }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-medium mb-2">Test Completed!</h3>
          <p className="text-muted-foreground mb-4">
            Your results are being analyzed.
          </p>
          <div className="animate-pulse-soft">Processing results...</div>
        </div>
      )}
    </div>
  );
};

export default WordSpeed;
