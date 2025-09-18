'use client';

import { useEffect, useRef, useState } from 'react';

const WorkshopLeaders = () => {
  const [isVisible, setIsVisible] = useState({});
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

  const workshopLeaders = [
    {
      name: "Alex Chen",
      role: "YC Founder",
      company: "TechFlow AI",
      description: "Built and sold 2 startups by age 22. Leading sessions on rapid prototyping and MVP development.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      expertise: "Product Development"
    },
    {
      name: "Sarah Martinez",
      role: "Serial Entrepreneur", 
      company: "Venture Labs",
      description: "Founded 3 companies, 2 successful exits. Teaching pitch mastery and investor relations.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      expertise: "Fundraising & Pitching"
    },
    {
      name: "David Kim",
      role: "Tech Lead",
      company: "Meta",
      description: "Senior engineer at Meta, ex-Google. Workshop on scaling tech infrastructure and architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      expertise: "Technical Architecture"
    },
    {
      name: "Maya Patel",
      role: "Growth Hacker",
      company: "Stripe",
      description: "Grew 3 startups from 0 to 1M users. Leading workshops on user acquisition and growth strategies.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      expertise: "Growth & Marketing"
    },
    {
      name: "Jordan Williams",
      role: "Design Director",
      company: "Airbnb",
      description: "Led design for major product launches. Teaching user experience and design thinking workshops.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      expertise: "UX/UI Design"
    },
    {
      name: "Priya Singh",
      role: "Business Strategist",
      company: "McKinsey & Co",
      description: "Strategy consultant for Fortune 500s. Workshop on business model validation and market analysis.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      expertise: "Business Strategy"
    }
  ];

  return (
    <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={(el) => addToRefs(el, 'header')}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              workshop
            </span>
            <br />
            <span className="text-white">leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn from industry experts who've built, scaled, and sold successful startups
          </p>
        </div>

        {/* Scrolling Cards Container */}
        <div 
          ref={(el) => addToRefs(el, 'cards')}
          className={`overflow-hidden transition-all duration-1000 ${
            isVisible.cards ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex animate-scroll-leaders hover:[animation-play-state:paused]">
            {/* First set of cards */}
            <div className="flex space-x-6 mr-6">
              {workshopLeaders.map((leader, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-400/50">
                      <img 
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                      <p className="text-blue-400 font-semibold text-sm">{leader.role}</p>
                      <p className="text-gray-400 text-sm">{leader.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {leader.description}
                  </p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg px-3 py-2">
                    <span className="text-blue-300 text-xs font-semibold">
                      {leader.expertise}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-6">
              {workshopLeaders.map((leader, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-400/50">
                      <img 
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                      <p className="text-blue-400 font-semibold text-sm">{leader.role}</p>
                      <p className="text-gray-400 text-sm">{leader.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {leader.description}
                  </p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg px-3 py-2">
                    <span className="text-blue-300 text-xs font-semibold">
                      {leader.expertise}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkshopLeaders;
