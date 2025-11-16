import React, { useState, useEffect } from 'react';
import { useTest } from '../context/TestContext';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoundData {
  type: string;
  items: string[];
  lines?: string[];
  correctOrder: number[];
  distractorIndex?: number;
}

const Storybook: React.FC = () => {
  const { completeTest, preferredLanguage } = useTest();
  const navigate = useNavigate();
  
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [roundScores, setRoundScores] = useState({ round1: 0, round2: 0, round3: 0 });
  const [pickedDistractor, setPickedDistractor] = useState(false);
  const [startTime] = useState(Date.now());
  const [roundStartTime, setRoundStartTime] = useState(Date.now());

  const rounds: Record<number, RoundData> = {
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
      finalizing: "Finalizing your results...",
      instructions: {
        round1: "Read these sentences and put them in the right story order by tapping them.",
        round2: "Look at these pictures and put them in the right story order by tapping them.", 
        round3: "Read the story above, then select and order the 3 images that match the story. Be careful - there's one extra image that doesn't belong!"
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
        round3: "ऊपर की कहानी पढ़ें, फिर कहानी से मेल खाने वाली 3 तस्वीरों का चयन और क्रम करें। सावधान रहें - एक अतिरिक्त तस्वीर है जो संबंधित नहीं है!"
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
        round3: "மேலே உள்ள கதையைப் படித்து, கதையுடன் பொருந்தும் 3 படங்களைத் தேர்ந்தெடுத்து வரிசைப்படுத்தவும். கவனமாக இருங்கள் - சேராத ஒரு கூடுதல் படம் உள்ளது!"
      }
    }
  };

  const content = translations[preferredLanguage];
  const currentRoundData = rounds[currentRound];

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
    } else {
      // Complete the test
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      completeTest('storybook', {
        round1Score: currentRound === 1 ? score : roundScores.round1,
        round2Score: currentRound === 2 ? score : roundScores.round2, 
        round3Score: currentRound === 3 ? score : roundScores.round3,
        pickedDistractor,
        timeSpent
      });
      
      // Navigate back to screening page
      navigate('/screening');
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
            {content.round} {currentRound} {content.of} 3
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

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit()}
              className={`px-8 py-3 text-lg font-semibold rounded-xl ${
                canSubmit()
                  ? 'bg-[#6C63FF] hover:bg-[#5A54E6] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentRound === 3 ? content.finalizing : content.submit}
              {currentRound < 3 && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
            
            {!canSubmit() && (
              <p className="text-sm text-[#6C63FF] mt-2">
                {currentRound === 3
                  ? `Select exactly 3 images (${selectedItems.length}/3 selected)`
                  : `Select all ${currentRoundData.items.length} items (${selectedItems.length}/${currentRoundData.items.length} selected)`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storybook;