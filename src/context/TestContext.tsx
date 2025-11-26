import React, { createContext, useContext, useEffect, useState } from 'react';

export type SupportedLanguage = 'english' | 'hindi' | 'tamil';
export type TestType = 'letterMatch' | 'storybook' | 'wordDetective';

export interface AnalysisData {
  sequencing: { score: number; note: string };
  omissions: { score: number; note: string };
  visualConfusion: { score: number; note: string };
  phonologicalCue: { score: number; note: string };
  recommendedFollowUps: string[];
  confidence: number;
}

interface TestResults {
  letterMatch?: {
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
  };
  storybook?: {
    round1Score: number;
    round2Score: number;
    round3Score: number;
    pickedDistractor: boolean;
    timeSpent: number;
    aiAnalysis?: Record<number, AnalysisData>;
    round4UserOrder?: number[];
    round5UserOrder?: number[];
  };
  wordDetective?: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
  };
}

interface TestContextType {
  preferredLanguage: SupportedLanguage;
  setPreferredLanguage: (lang: SupportedLanguage) => void;
  currentTest: TestType | null;
  startTest: (test: TestType) => void;
  completeTest: (test: TestType, results: any) => void;
  isTestCompleted: (test: TestType) => boolean;
  testResults: TestResults;
  resetTests: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferredLanguage, setPreferredLanguage] = useState<SupportedLanguage>(() => {
    const stored = localStorage.getItem('preferredLanguage');
    return (stored as SupportedLanguage) || 'english';
  });

  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [completedTests, setCompletedTests] = useState<TestType[]>([]);
  const [testResults, setTestResults] = useState<TestResults>({});

  useEffect(() => {
    localStorage.setItem('preferredLanguage', preferredLanguage);
  }, [preferredLanguage]);

  const startTest = (test: TestType) => {
    setCurrentTest(test);
  };

  const completeTest = (test: TestType, results: any) => {
    setCompletedTests(prev => [...prev, test]);
    setTestResults(prev => ({
      ...prev,
      [test]: results
    }));
    setCurrentTest(null);
  };

  const isTestCompleted = (test: TestType) => {
    return completedTests.includes(test);
  };

  const resetTests = () => {
    setCompletedTests([]);
    setTestResults({});
    setCurrentTest(null);
  };

  return (
    <TestContext.Provider value={{ 
      preferredLanguage, 
      setPreferredLanguage,
      currentTest,
      startTest,
      completeTest,
      isTestCompleted,
      testResults,
      resetTests
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (!context) throw new Error('useTest must be used within a TestProvider');
  return context;
};
