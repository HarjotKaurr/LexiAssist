
import React, { useState, useEffect } from 'react';
import { useTest } from '../context/TestContext';

const letters = [
  { question: 'b', options: ['b', 'd', 'p', 'q'], answer: 'b' },
  { question: 'd', options: ['b', 'd', 'p', 'q'], answer: 'd' },
  { question: 'p', options: ['b', 'd', 'p', 'q'], answer: 'p' },
  { question: 'q', options: ['b', 'd', 'p', 'q'], answer: 'q' },
  { question: 'b', options: ['b', 'd', 'p', 'q'], answer: 'b' },
  { question: 'p', options: ['b', 'd', 'p', 'q'], answer: 'p' },
  { question: 'd', options: ['b', 'd', 'p', 'q'], answer: 'd' },
  { question: 'q', options: ['b', 'd', 'p', 'q'], answer: 'q' },
];

const LetterMatch: React.FC = () => {
  const { completeTest } = useTest();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentQuestion = letters[currentIndex];
  const isLastQuestion = currentIndex === letters.length - 1;
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    
    setTimeout(() => {
      if (isLastQuestion) {
        const timeSpent = (Date.now() - startTime) / 1000;
        completeTest('letterMatch', {
          correctAnswers,
          totalQuestions: letters.length,
          timeSpent,
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      }
    }, 700);
  };
  
  return (
    <div className="w-full max-w-xl mx-auto pt-24 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Letter Matching Test</h2>
        <p className="text-muted-foreground">Identify the matching letter from the options below.</p>
      </div>
      
      <div className="mb-8">
        <div className="text-center">
          <span className="inline-block text-8xl font-dyslexic mb-2">{currentQuestion.question}</span>
          <p className="text-sm text-muted-foreground">Question {currentIndex + 1} of {letters.length}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`p-6 text-4xl font-dyslexic rounded-lg shadow-sm transition-all duration-300 ${
              selectedOption === option
                ? option === currentQuestion.answer
                  ? 'bg-green-100 border-green-400 border-2'
                  : 'bg-red-100 border-red-400 border-2'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Correct: {correctAnswers} / {currentIndex + (selectedOption ? 1 : 0)}
        </div>
        {/* Progress bar */}
        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary rounded-full h-2.5 transition-all duration-300"
            style={{ width: `${((currentIndex + (selectedOption ? 1 : 0)) / letters.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LetterMatch;
