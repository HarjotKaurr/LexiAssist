import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Award, ArrowRight } from 'lucide-react';
import { useTest } from '../context/TestContext';

const Home: React.FC = () => {
  const { preferredLanguage } = useTest();

  const translations = {
    english: {
      title: "LexiAssist Screening",
      subtitle: "Fun games to help you read better!",
      description: "Complete these quick activities to discover your unique learning style.",
      ageRange: "Perfect for ages 8-12",
      startButton: "Let's Start!",
      features: [
        { icon: Rocket, title: "Quick Games", description: "Just 5 minutes to complete all activities" },
        { icon: BookOpen, title: "Learn Your Way", description: "Get personalized learning tips just for you" },
        { icon: Award, title: "Track Progress", description: "See how much you improve each time" }
      ]
    },
    hindi: {
      title: "लेक्सी असिस्ट स्क्रीनिंग",
      subtitle: "बेहतर पढ़ने में मदद के लिए मज़ेदार खेल!",
      description: "अपनी अनूठी सीखने की शैली की खोज के लिए इन त्वरित गतिविधियों को पूरा करें।",
      ageRange: "8-12 वर्ष की आयु के लिए एकदम सही",
      startButton: "शुरू करें!",
      features: [
        { icon: Rocket, title: "त्वरित खेल", description: "सभी गतिविधियों को पूरा करने के लिए सिर्फ 5 मिनट" },
        { icon: BookOpen, title: "अपने तरीके से सीखें", description: "सिर्फ आपके लिए व्यक्तिगत सीखने की युक्तियां प्राप्त करें" },
        { icon: Award, title: "प्रगति का हिसाब रखें", description: "देखें कि हर बार आप कितना सुधार करते हैं" }
      ]
    },
    tamil: {
      title: "லெக்ஸி அசிஸ்ட் திரையிடல்",
      subtitle: "சிறப்பாக படிக்க உதவும் வேடிக்கையான விளையாட்டுகள்!",
      description: "உங்கள் தனித்துவமான கற்றல் பாணியைக் கண்டறிய இந்த விரைவான செயல்பாடுகளை முடிக்கவும்.",
      ageRange: "8-12 வயதினருக்கு சரியானது",
      startButton: "ஆரம்பிக்கலாம்!",
      features: [
        { icon: Rocket, title: "விரைவான விளையாட்டுகள்", description: "அனைத்து செயல்பாடுகளையும் முடிக்க வெறும் 5 நிமிடங்கள்" },
        { icon: BookOpen, title: "உங்கள் வழியில் கற்றுக்கொள்ளுங்கள்", description: "உங்களுக்கான தனிப்பயனாக்கப்பட்ட கற்றல் குறிப்புகளைப் பெறுங்கள்" },
        { icon: Award, title: "முன்னேற்றத்தைக் கண்காணிக்கவும்", description: "ஒவ்வொரு முறையும் நீங்கள் எவ்வளவு மேம்படுகிறீர்கள் என்பதைப் பாருங்கள்" }
      ]
    }
  };

  const content = translations[preferredLanguage];

  return (
    <div className="relative pt-32 pb-16 px-6 min-h-screen bg-[#fef7cd]/50">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-[#2B2D42]">{content.title}</h1>
          <p className="text-2xl mb-4 text-[#6C63FF]">{content.subtitle}</p>
          <p className="text-lg mb-6 text-[#555770]">{content.description}</p>
          <div className="inline-block bg-[#FFE3EC] text-[#6C63FF] rounded-full px-6 py-2 text-md mb-10">
            {content.ageRange}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#fce9d7] rounded-3xl shadow-md p-10 border-2 border-[#CADCFC] text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <feature.icon className="text-[#6C63FF]" size={30} />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#2B2D42]">{feature.title}</h3>
              <p className="text-base text-[#333]">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
        <Link to="/screening" className="bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white text-2xl px-8 py-4 rounded-xl flex items-center gap-3 font-dyslexic shadow-lg transition">
            {content.startButton} <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
