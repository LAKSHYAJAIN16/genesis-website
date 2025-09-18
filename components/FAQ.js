'use client';

import { useEffect, useRef, useState } from 'react';

const FAQ = () => {
  const [isVisible, setIsVisible] = useState({});
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            setIsVisible(prev => ({
              ...prev,
              [elementId]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, id) => {
    if (el && !elementsRef.current.includes(el)) {
      el.setAttribute('data-animate-id', id);
      elementsRef.current.push(el);
    }
  };

  const toggleFAQ = (index) => {
    if (openFAQ !== index) {
      setOpenFAQ(index);
      setIsTyping(true);
      setDisplayedText('');
      setShowCursor(true);
      
      // Show typing animation for 0.5 seconds
      setTimeout(() => {
        setIsTyping(false);
        // Start typewriter effect
        const text = faqs[index].answer;
        let currentIndex = 0;
        
        const typeWriter = () => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
            setTimeout(typeWriter, 8); // Even faster typing speed
          } else {
            // Hide cursor when typing is complete
            setTimeout(() => setShowCursor(false), 500);
          }
        };
        
        typeWriter();
      }, 500);
    }
  };

  // Initialize first answer on component mount
  useEffect(() => {
    if (faqs.length > 0) {
      setIsTyping(true);
      setShowCursor(true);
      setTimeout(() => {
        setIsTyping(false);
        const text = faqs[0].answer;
        let currentIndex = 0;
        
        const typeWriter = () => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
            setTimeout(typeWriter, 8);
          } else {
            // Hide cursor when typing is complete
            setTimeout(() => setShowCursor(false), 500);
          }
        };
        
        typeWriter();
      }, 500);
    }
  }, []);

  const faqs = [
    {
      question: "Who can participate in Genesis?",
      answer: "Genesis is exclusively for high school students aged 14-18. You don't need any prior coding experience - just bring your curiosity and entrepreneurial spirit!"
    },
    {
      question: "Do I need a team to participate?",
      answer: "Not at all! You can come solo and we'll help you find teammates during the event, or you can bring your own team of up to 4 people. We encourage collaboration and will facilitate team formation."
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring your laptop, charger, any hardware you want to work with, and comfortable clothes for the weekend. We'll provide food, drinks, swag, and all the mentorship you need!"
    },
    {
      question: "Is there a cost to participate?",
      answer: "Genesis is completely FREE! This includes meals, snacks, swag, workshops, mentorship, and access to all our resources. We believe cost shouldn't be a barrier to innovation."
    },
    {
      question: "What kind of projects can I build?",
      answer: "Anything! Web apps, mobile apps, hardware projects, AI/ML solutions, games, social impact tools - the sky's the limit. We encourage projects that solve real problems or create value."
    },
    {
      question: "Will there be mentors and workshops?",
      answer: "Absolutely! We have industry experts from top companies leading workshops on everything from coding to pitching. Mentors will be available throughout the weekend to help with technical challenges and business strategy."
    },
    {
      question: "How are projects judged and what can I win?",
      answer: "Projects are judged on innovation, technical execution, design, and presentation. Winners receive cash prizes up to $5,000, plus exclusive internship opportunities and startup resources."
    },
    {
      question: "What if I'm a complete beginner?",
      answer: "Perfect! Genesis is designed for all skill levels. We have beginner-friendly workshops, patient mentors, and resources to help you learn as you build. Many successful projects come from first-time hackers!"
    }
  ];

  return (
    <section id="faq" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            ref={(el) => addToRefs(el, 'title')}
            className={`text-5xl md:text-7xl mb-8 text-white leading-tight transition-all duration-1000 ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            frequently asked <span 
              className="italic font-serif relative inline-block text-6xl md:text-8xl group cursor-pointer" 
              style={{transform: 'skewX(-8deg)'}}
            >
              <span 
                className="absolute top-0 left-0 group-hover:animate-jitter-1" 
                style={{color: '#ff0080', transform: 'translate(0px, 0px)'}}
              >
                questions.
              </span>
              <span 
                className="absolute top-0 left-0 group-hover:animate-jitter-2" 
                style={{color: '#40e0d0', transform: 'translate(3px, 3px)'}}
              >
                questions.
              </span>
              <span 
                className="relative z-10 group-hover:animate-jitter-3" 
                style={{color: '#ff8c00', transform: 'translate(6px, 6px)'}}
              >
                questions.
              </span>
            </span>
          </h2>
        </div>

        {/* Questions Collection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <button
              key={index}
              ref={(el) => addToRefs(el, `question-${index}`)}
              onClick={() => toggleFAQ(index)}
              className={`text-left text-white px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                openFAQ === index 
                  ? 'border-orange-400 bg-orange-400/20 shadow-lg shadow-orange-400/20' 
                  : 'border-white/20 hover:border-orange-400/30'
              } ${isVisible[`question-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <p className="text-sm font-medium leading-tight">
                {faq.question}
              </p>
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        {openFAQ !== null && (
          <div 
            className="max-w-3xl mx-auto bg-black rounded-3xl border border-white/20 p-8 shadow-2xl"
            ref={(el) => addToRefs(el, 'chat')}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Genesis Team</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpenFAQ(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-6">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="flex items-end space-x-3 max-w-lg">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-2xl rounded-br-sm relative shadow-lg">
                    <p className="text-sm font-medium">{faqs[openFAQ].question}</p>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-l-purple-500 border-t-8 border-t-transparent"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Genesis Response */}
              <div className="flex justify-start">
                <div className="flex items-end space-x-3 max-w-2xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">G</span>
                  </div>
                  <div className="bg-black text-gray-100 px-6 py-4 rounded-2xl rounded-bl-sm relative border border-white/20 shadow-lg">
                    {isTyping ? (
                      <div className="flex space-x-1 py-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{displayedText}{showCursor && <span className="animate-pulse">|</span>}</p>
                    )}
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-r-8 border-r-black border-t-8 border-t-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default FAQ;
