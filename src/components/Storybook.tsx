import React, { useState, useEffect } from 'react';
import { useTest, type AnalysisData } from '../context/TestContext';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoundData {
  type: string;
  items: string[];
  lines?: string[];
  correctOrder?: number[];
  distractorIndex?: number;
  promptText?: string;
  aiGenerated?: boolean;
}

// Fallback rounds for when AI generation fails or user skips
const FALLBACK_ROUNDS: Record<number, RoundData> = {
  4: {
    type: "text",
    promptText: "Tap the sentences in the correct story order:",
    items: [
      "A small bird lost its way during a storm.",
      "A kind child found the bird and brought it home.",
      "The bird learned to fly again and thanked the child."
    ],
    aiGenerated: true
  },
  5: {
    type: "text",
    promptText: "Tap the sentences in the correct story order:",
    items: [
      "A small kite slipped from a child's hands and drifted into a tall tree.",
      "The child carefully climbed up the branches until he reached the bright red kite.",
      "He climbed back down safely and ran across the field, laughing as the kite flew again."
    ],
    aiGenerated: true
  }
};

const Storybook: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const navigate = useNavigate();
  
  // Initial rounds (1-3 hardcoded)
  const initialRounds: Record<number, RoundData> = {
    1: {
      type: "text",
      items: [
        "The little cat found a shiny key.",
        "The cat opened a small treasure box.", 
        "Inside the box, there was a sparkling star."
      ],
      correctOrder: [1, 2, 3]
    },
    2: {
      type: "image",
      items: [
        "storybook-assets/round-2/1.png",
        "storybook-assets/round-2/2.png",
        "storybook-assets/round-2/3.png"
      ],
      correctOrder: [1, 2, 3]
    },
    3: {
      type: "imageDistractor",
      lines: [
        "A little rocket blasted off into the sky.",
        "The rocket flew past the moon.",
        "It landed safely on a red planet."
      ],
      items: [
        "storybook-assets/round-3/1.png",
        "storybook-assets/round-3/2.png", 
        "storybook-assets/round-3/3.png",
        "storybook-assets/round-3/4.png"
      ],
      correctOrder: [1, 2, 3],
      distractorIndex: 4
    }
  };

  // State management
  const [rounds, setRounds] = useState<Record<number, RoundData>>(initialRounds);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [roundScores, setRoundScores] = useState({ round1: 0, round2: 0, round3: 0 });
  const [aiAnalysis, setAiAnalysis] = useState<Record<number, AnalysisData>>({});
  const [pickedDistractor, setPickedDistractor] = useState(false);
  const [startTime] = useState(Date.now());
  const [roundStartTime, setRoundStartTime] = useState(Date.now());
  const [submittedRounds, setSubmittedRounds] = useState<Set<number>>(new Set());
  
  // UI states
  const [showGeneratingCard, setShowGeneratingCard] = useState(false);
  const [generatingError, setGeneratingError] = useState<string | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const translations = {
    english: {
      title: "Storybook Challenge",
      round: "Round",
      of: "of",
      tapToOrder: "Tap the sentences in the correct story order:",
      tapImages: "Tap the images in the correct story order:",
      story: "Story:",
      submit: "Submit Answer",
      nextRound: "Next Round",
      backHome: "Back to Home",
      great: "Great!",
      roundComplete: "Round Complete!",
      score: "Score:",
      outOf: "out of",
      finalizing: "Testing you on your patterns...",
      instructions: {
        round1: "Read these sentences and put them in the right story order by tapping them.",
        round2: "Look at these pictures and put them in the right story order by tapping them.", 
        round3: "Read the story above, then select and order the 3 images that match the story. Be careful - there's one extra image that doesn't belong!",
        round4: "Read these sentences carefully and put them in the right story order by tapping them.",
        round5: "Read these sentences carefully and put them in the right story order by tapping them."
      }
    },
    hindi: {
      title: "स्टोरीबुक चुनौती",
      round: "राउंड",
      of: "का",
      tapToOrder: "कहानी के सही क्रम में वाक्यों को टैप करें:",
      tapImages: "कहानी के सही क्रम में तस्वीरों को टैप करें:",
      story: "कहानी:",
      submit: "उत्तर जमा करें",
      nextRound: "अगला राउंड",
      backHome: "होम पर वापस",
      great: "बहुत बढ़िया!",
      roundComplete: "राउंड पूरा!",
      score: "स्कोर:",
      outOf: "में से",
      finalizing: "आपके परिणामों को अंतिम रूप दे रहे हैं...",
      instructions: {
        round1: "इन वाक्यों को पढ़ें और उन्हें टैप करके सही कहानी क्रम में रखें।",
        round2: "इन तस्वीरों को देखें और उन्हें टैप करके सही कहानी क्रम में रखें।",
        round3: "ऊपर की कहानी पढ़ें, फिर कहानी से मेल खाने वाली 3 तस्वीरों का चयन और क्रम करें। सावधान रहें - एक अतिरिक्त तस्वीर है जो संबंधित नहीं है!",
        round4: "इन वाक्यों को ध्यान से पढ़ें और उन्हें टैप करके सही कहानी क्रम में रखें।",
        round5: "इन वाक्यों को ध्यान से पढ़ें और उन्हें टैप करके सही कहानी क्रम में रखें।"
      }
    },
    tamil: {
      title: "கதைப்புத்தக சவால்",
      round: "சுற்று",
      of: "இன்",
      tapToOrder: "கதையின் சரியான வரிசையில் வாக்கியங்களை தட்டவும்:",
      tapImages: "கதையின் சரியான வரிசையில் படங்களை தட்டவும்:",
      story: "கதை:",
      submit: "பதில் சமர்ப்பிக்கவும்",
      nextRound: "அடுத்த சுற்று",
      backHome: "முகப்புக்கு திரும்பு",
      great: "சிறப்பு!",
      roundComplete: "சுற்று முடிந்தது!",
      score: "மதிப்பெண்:",
      outOf: "இல்",
      finalizing: "உங்கள் முடிவுகளை இறுதிப்படுத்துகிறது...",
      instructions: {
        round1: "இந்த வாக்கியங்களைப் படித்து, அவற்றைத் தட்டி சரியான கதை வரிசையில் வைக்கவும்.",
        round2: "இந்த படங்களைப் பார்த்து, அவற்றைத் தட்டி சரியான கதை வரிசையில் வைக்கவும்.",
        round3: "மேலே உள்ள கதையைப் படித்து, கதையுடன் பொருந்தும் 3 படங்களைத் தேர்ந்தெடுத்து வரிசைப்படுத்தவும். கவனமாக இருங்கள் - சேராத ஒரு கூடுதல் படம் உள்ளது!",
        round4: "இந்த வாக்கியங்களைப் பொருமையுடன் படித்து, அவற்றைத் தட்டி சரியான கதை வரிசையில் வைக்கவும்.",
        round5: "இந்த வாக்கியங்களைப் பொருமையுடன் படித்து, அவற்றைத் தட்டி சரியான கதை வரிசையில் வைக்கவும்."
      }
    }
  };

  const content = translations[preferredLanguage];
  const currentRoundData = rounds[currentRound];
  const totalRounds = 5; // Always 5: 3 initial + 2 AI rounds

  // Base URL for API calls
  const base = import.meta.env.VITE_API_URL || '';
  
  // Fetch AI rounds after round 3 submit
  const fetchAIRounds = async () => {
    setShowGeneratingCard(true);
    setGeneratingError(null);
    
    try {
      const response = await fetch(`${base}/api/storybook/generate-rounds`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredLanguage,
          sessionId: `session-${Date.now()}`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate rounds');
      }
      
      const data = await response.json();
      const aiRounds: Record<number, RoundData> = {};
      
      data.rounds.forEach((round: any, index: number) => {
        aiRounds[4 + index] = {
          type: round.type,
          items: round.items,
          promptText: round.promptText,
          aiGenerated: true
        };
      });
      
      setRounds(prev => ({ ...prev, ...aiRounds }));
      // Move to the first AI round (4) once rounds are appended
      setShowGeneratingCard(false);
      setCurrentRound(4);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error generating rounds:', error);
      setGeneratingError('Failed to generate rounds. Using fallback.');
      // Use fallback rounds
      setRounds(prev => ({ ...prev, ...FALLBACK_ROUNDS }));
      // Move to fallback AI round (4) and clear selections
      setShowGeneratingCard(false);
      setCurrentRound(4);
      setSelectedItems([]);
    }
  };

  // Analyze AI round response
  const analyzeResponse = async () => {
    console.log(`[analyzeResponse] Starting analysis for round ${currentRound}`);
    
    // Check if already analyzed
    if (submittedRounds.has(currentRound) && aiAnalysis[currentRound]) {
      console.log(`[analyzeResponse] Round ${currentRound} already analyzed, showing cached result`);
      setCurrentAnalysis(aiAnalysis[currentRound]);
      setShowAnalysisModal(true);
      return;
    }
    
    console.log(`[analyzeResponse] Selected items:`, selectedItems);
    console.log(`[analyzeResponse] Shuffled items:`, shuffledItems);
    
    setIsAnalyzing(true);
    
    try {
      const promptText = currentRoundData.promptText || '';
      const userOrder = selectedItems.map(i => 
        currentRoundData.items.indexOf(shuffledItems[i]) + 1
      );
      
      console.log(`[analyzeResponse] User order:`, userOrder);
      
      const response = await fetch(`${base}/api/storybook/analyze-response`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roundId: `ai-${currentRound}`,
          promptText,
          items: currentRoundData.items,
          userOrder,
          sessionId: `session-${Date.now()}`,
          preferredLanguage
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[analyzeResponse] API error: ${response.status}`, errorText);
        throw new Error('Failed to analyze response');
      }
      
      const data = await response.json();
      console.log(`[analyzeResponse] Analysis received:`, data);
      
      const analysis = data.analysis || data.data?.analysis || data.data || data;
      
      setAiAnalysis(prev => ({ ...prev, [currentRound]: analysis }));
      setCurrentAnalysis(analysis);
      setShowAnalysisModal(true);
      console.log(`[analyzeResponse] Modal should now be visible`);
    } catch (error) {
      console.error('[analyzeResponse] Error analyzing response:', error);
      // Silently proceed without analysis (no error shown to user, just continue)
      handleAIRoundSubmit();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle submission of AI rounds
  const handleAIRoundSubmit = () => {
    setShowAnalysisModal(false);
    setSubmittedRounds(prev => new Set([...prev, currentRound]));
    
    if (currentRound < totalRounds) {
      setCurrentRound(prev => prev + 1);
      setSelectedItems([]);
    } else {
      // Complete test
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      completeTest('storybook', {
        round1Score: roundScores.round1,
        round2Score: roundScores.round2,
        round3Score: roundScores.round3,
        pickedDistractor,
        timeSpent,
        sessionId: `session-${Date.now()}`
      });
      
      navigate('/screening');
    }
  };

  // Shuffle items for all rounds
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);

  useEffect(() => {
    const items = [...currentRoundData.items];
    // Simple shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setShuffledItems(items);
    setRoundStartTime(Date.now());
  }, [currentRound]);

  const handleItemTap = (index: number) => {
    // Prevent changes if round has been submitted
    if (currentRound > 3 && submittedRounds.has(currentRound)) {
      return;
    }

    const actualIndex = shuffledItems.indexOf(currentRoundData.items[index]);
    const displayIndex = shuffledItems.findIndex(item => item === currentRoundData.items[index]);
    
    if (selectedItems.includes(displayIndex)) {
      // Deselect - remove the item and shift others down
      setSelectedItems(prev => {
        const newItems = prev.filter(item => item !== displayIndex);
        return newItems;
      });
    } else {
      // Select - add to the end of selection
      setSelectedItems(prev => [...prev, displayIndex]);
    }
  };

  const getSelectedOrder = (index: number): number => {
    const displayIndex = shuffledItems.findIndex(item => item === currentRoundData.items[index]);
    const position = selectedItems.indexOf(displayIndex);
    return position === -1 ? 0 : position + 1;
  };

  const calculateScore = (): number => {
    const maxSelections = currentRound === 3 ? 3 : currentRoundData.items.length;
    
    if (selectedItems.length !== maxSelections) return 0;

    let score = 0;
    
    for (let i = 0; i < maxSelections; i++) {
      const selectedItemIndex = selectedItems[i];
      let originalIndex;
      
      const selectedItem = shuffledItems[selectedItemIndex];
      originalIndex = currentRoundData.items.indexOf(selectedItem) + 1;
      
      if (originalIndex === currentRoundData.correctOrder[i]) {
        score += 1;
      }
    }

    // Check for distractor selection in round 3
    if (currentRound === 3) {
      const distractorItem = currentRoundData.items[3]; // 4th item is distractor
      const distractorShuffledIndex = shuffledItems.indexOf(distractorItem);
      if (selectedItems.includes(distractorShuffledIndex)) {
        setPickedDistractor(true);
      }
    }

    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    
    setRoundScores(prev => ({
      ...prev,
      [`round${currentRound}`]: score
    }));

    if (currentRound < 3) {
      setCurrentRound(prev => prev + 1);
      setSelectedItems([]);
    } else if (currentRound === 3) {
      // After round 3, fetch AI rounds
      setRoundScores(prev => ({
        ...prev,
        round3: score
      }));
      fetchAIRounds();
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const canSubmit = () => {
    const requiredSelections = currentRound === 3 ? 3 : currentRoundData.items.length;
    return selectedItems.length === requiredSelections;
  };

  return (
    <div className="min-h-screen bg-[#fef7cd]/50 p-8">
      <div className="container mx-auto max-w-6xl pt-20">
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
          
          <h1 className="text-4xl font-bold mb-2 text-[#2B2D42]">{content.title}</h1>
          <p className="text-lg text-[#6C63FF]">
            {content.round} {currentRound} {content.of} {totalRounds}
            {currentRoundData.aiGenerated && (
              <span className="ml-2 inline-block text-xs bg-[#6C63FF]/20 text-[#6C63FF] px-2 py-1 rounded-full">
                AI-generated
              </span>
            )}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-[#E8F5E8] rounded-2xl p-6 mb-6 max-w-2xl mx-auto">
          <p className="text-base text-[#2B2D42] text-center">
            {content.instructions[`round${currentRound}`]}
          </p>
        </div>

        {/* Round 3 Story Lines */}
        {currentRound === 3 && (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 max-w-2xl mx-auto border-2 border-[#CADCFC]">
            <h3 className="text-xl font-bold mb-4 text-[#6C63FF] text-center">{content.story}</h3>
            <div className="space-y-2">
              {currentRoundData.lines?.map((line, index) => (
                <p key={index} className="text-base text-[#2B2D42] text-center">
                  {index + 1}. {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Game Content */}
        <div className="bg-white rounded-3xl shadow-lg p-10 border-2 border-[#CADCFC] max-w-5xl mx-auto">
          
          {/* Round 1: Text Items */}
          {currentRound === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#6C63FF] mb-6">{content.tapToOrder}</h2>
              {shuffledItems.map((item, index) => {
                const originalIndex = currentRoundData.items.indexOf(item);
                return (
                <div
                  key={index}
                  onClick={() => handleItemTap(originalIndex)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 relative ${
                    selectedItems.includes(index)
                      ? 'border-[#6C63FF] bg-[#6C63FF]/10 shadow-md'
                      : 'border-[#CADCFC] hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/5'
                  }`}
                >
                  <p className="text-lg text-[#2B2D42] pr-12">{item}</p>
                  {getSelectedOrder(originalIndex) > 0 && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-[#6C63FF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {getSelectedOrder(originalIndex)}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          )}

          {/* Round 2: Images */}
          {currentRound === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-[#6C63FF] mb-6">{content.tapImages}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shuffledItems.map((item, index) => {
                  const originalIndex = currentRoundData.items.indexOf(item);
                  return (
                    <div
                      key={index}
                      onClick={() => handleItemTap(originalIndex)}
                      className={`relative cursor-pointer transition-all duration-200 rounded-xl overflow-hidden ${
                        selectedItems.includes(index)
                          ? 'ring-4 ring-[#6C63FF] shadow-lg scale-105'
                          : 'hover:ring-2 hover:ring-[#6C63FF]/50 hover:scale-102'
                      }`}
                    >
                      <img
                        src={item}
                        alt={`Story image ${originalIndex + 1}`}
                        className="w-full h-64 md:h-72 object-contain max-w-full max-h-full"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          console.warn('Image failed to load:', item);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item);
                        }}
                      />
                      {getSelectedOrder(originalIndex) > 0 && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#6C63FF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {getSelectedOrder(originalIndex)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Round 3: Images with Distractor */}
          {currentRound === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-[#6C63FF] mb-6">{content.tapImages}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {shuffledItems.map((item, index) => {
                  const originalIndex = currentRoundData.items.indexOf(item);
                  return (
                    <div
                      key={index}
                      onClick={() => handleItemTap(originalIndex)}
                      className={`relative cursor-pointer transition-all duration-200 rounded-xl overflow-hidden ${
                        selectedItems.includes(index)
                          ? 'ring-4 ring-[#6C63FF] shadow-lg scale-105'
                          : 'hover:ring-2 hover:ring-[#6C63FF]/50 hover:scale-102'
                      }`}
                    >
                      <img
                        src={item}
                        alt={`Story image ${originalIndex + 1}`}
                        className="w-full h-48 md:h-56 object-contain max-w-full max-h-full"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          console.warn('Image failed to load:', item);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item);
                        }}
                      />
                      {getSelectedOrder(originalIndex) > 0 && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#6C63FF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {getSelectedOrder(originalIndex)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Rounds: Text */}
          {currentRound > 3 && currentRoundData.type === 'text' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-[#6C63FF] mb-6">{currentRoundData.promptText}</h2>
              {shuffledItems.map((item, index) => {
                const originalIndex = currentRoundData.items.indexOf(item);
                return (
                  <div
                    key={index}
                    onClick={() => handleItemTap(originalIndex)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 relative ${
                      selectedItems.includes(index)
                        ? 'border-[#6C63FF] bg-[#6C63FF]/10 shadow-md'
                        : 'border-[#CADCFC] hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/5'
                    }`}
                  >
                    <p className="text-lg text-[#2B2D42] pr-12">{item}</p>
                    {getSelectedOrder(originalIndex) > 0 && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-[#6C63FF] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {getSelectedOrder(originalIndex)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              onClick={() => {
                // If already submitted, show evaluation modal again
                if (currentRound > 3 && submittedRounds.has(currentRound)) {
                  console.log(`[submit] Showing cached evaluation for round ${currentRound}`);
                  setShowAnalysisModal(true);
                  return;
                }
                
                console.log(`[submit] Clicked. currentRound=${currentRound}, totalRounds=${totalRounds}, canSubmit=${canSubmit()}`);
                
                // Only calculate score for non-AI rounds
                if (currentRound <= 3) {
                  const score = calculateScore();
                  console.log(`[submit] Score calculated: ${score}`);
                  
                  setRoundScores(prev => ({
                    ...prev,
                    [`round${currentRound}`]: score
                  }));
                }

                if (currentRound < 3) {
                  console.log(`[submit] Moving to next regular round`);
                  setCurrentRound(prev => prev + 1);
                  setSelectedItems([]);
                } else if (currentRound === 3) {
                  console.log(`[submit] Round 3 complete, fetching AI rounds`);
                  // After round 3, fetch AI rounds
                  fetchAIRounds();
                } else {
                  console.log(`[submit] AI round ${currentRound}, analyzing response`);
                  // Mark as submitted and analyze
                  setSubmittedRounds(prev => new Set([...prev, currentRound]));
                  // AI rounds - analyze response
                  analyzeResponse();
                }
              }}
              disabled={!canSubmit() || isAnalyzing}
              className={`px-8 py-3 text-lg font-semibold rounded-xl ${
                (canSubmit() && !isAnalyzing) || (currentRound > 3 && submittedRounds.has(currentRound))
                  ? 'bg-[#6C63FF] hover:bg-[#5A54E6] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {currentRound > 3 && submittedRounds.has(currentRound) ? (
                    <>
                      View Evaluation
                      <ArrowRight className="ml-2 h-5 w-5 inline" />
                    </>
                  ) : (
                    <>
                      {currentRound === 3 ? content.finalizing : content.submit}
                      {currentRound < totalRounds && <ArrowRight className="ml-2 h-5 w-5" />}
                    </>
                  )}
                </>
              )}
            </Button>
            
            {!canSubmit() && !(currentRound > 3 && submittedRounds.has(currentRound)) && (
              <p className="text-sm text-[#6C63FF] mt-2">
                {currentRound === 3
                  ? `Select exactly 3 images (${selectedItems.length}/3 selected)`
                  : `Select all ${currentRoundData.items.length} items (${selectedItems.length}/${currentRoundData.items.length} selected)`}
              </p>
            )}
          </div>
        </div>

        {/* Generating Card (shows while fetching AI rounds) */}
        {showGeneratingCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 text-center shadow-xl">
              <Loader2 className="h-12 w-12 text-[#6C63FF] mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-[#2B2D42] mb-2">Generating personalised questions for you</h2>
              <p className="text-[#6C63FF] mb-6">This helps us tailor follow-ups to how you read the story. This will only take a few seconds.</p>
              {generatingError && (
                <p className="text-red-500 text-sm mb-4">{generatingError}</p>
              )}
              <Button
                onClick={() => {
                  setShowGeneratingCard(false);
                  setRounds(prev => ({ ...prev, ...FALLBACK_ROUNDS }));
                }}
                variant="ghost"
                className="text-[#6C63FF] hover:bg-[#6C63FF]/10"
              >
                Skip
              </Button>
            </div>
          </div>
        )}

        {/* Analysis Modal */}
        {showAnalysisModal && currentAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#2B2D42]">Your Thinking</h2>
                <button
                  onClick={() => setShowAnalysisModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-[#6C63FF] text-sm mb-6 leading-relaxed">
                {currentAnalysis.sequencing?.note || ""}
              </p>

              {/* Cues Badges */}
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Sequencing', score: currentAnalysis.sequencing?.score },
                  { label: 'Omissions', score: currentAnalysis.omissions?.score },
                  { label: 'Visual Confusion', score: currentAnalysis.visualConfusion?.score },
                  { label: 'Sound-based', score: currentAnalysis.phonologicalCue?.score }
                ].map(cue => (
                  <div key={cue.label} className="flex items-center justify-between p-3 bg-[#F0F4FF] rounded-lg">
                    <span className="text-[#2B2D42] font-medium">{cue.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#E0E7FF] rounded-full h-2">
                        <div
                          className="bg-[#6C63FF] h-2 rounded-full transition-all"
                          style={{ width: `${(cue.score || 0) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#6C63FF] font-semibold w-8 text-right">
                        {Math.round((cue.score || 0) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Follow-ups */}
              {currentAnalysis.recommendedFollowUps && currentAnalysis.recommendedFollowUps.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[#2B2D42] mb-2">Good questions to ask:</h3>
                  <ul className="space-y-2">
                    {currentAnalysis.recommendedFollowUps.slice(0, 2).map((followUp, i) => (
                      <li key={i} className="text-sm text-[#6C63FF] flex gap-2">
                        <span className="font-bold">•</span>
                        <span>{followUp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center mb-4">
                Screening aid — not a diagnosis. Confidence: {Math.round((currentAnalysis.confidence || 0) * 100)}%
              </p>

              <Button
                onClick={handleAIRoundSubmit}
                className="w-full bg-[#6C63FF] hover:bg-[#5A54E6] text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Storybook;