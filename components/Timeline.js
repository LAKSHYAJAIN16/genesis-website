'use client';

import { useEffect, useRef, useState } from 'react';

const Timeline = () => {
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

  const timelineData = [
    {
      hour: "fri 6pm",
      title: "check-in & networking",
      description: "Registration, swag pickup, and meet your fellow builders",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    },
    {
      hour: "fri 8pm",
      title: "opening ceremony",
      description: "Keynote speakers, rules overview, and team formation",
      icon: "🚀",
      color: "from-purple-500 to-pink-500"
    },
    {
      hour: "fri 10pm",
      title: "ideation workshops",
      description: "Brainstorm sessions and market validation techniques",
      icon: "💡",
      color: "from-yellow-500 to-orange-500"
    },
    {
      hour: "sat 12pm",
      title: "building & mentorship",
      description: "Intensive development with 1-on-1 mentor guidance",
      icon: "⚡",
      color: "from-green-500 to-emerald-500"
    },
    {
      hour: "sat 8pm",
      title: "pitch workshops",
      description: "Learn to craft compelling presentations and demos",
      icon: "📈",
      color: "from-indigo-500 to-purple-500"
    },
    {
      hour: "sun 2pm",
      title: "final presentations",
      description: "Demo your startup to judges and the community",
      icon: "🎤",
      color: "from-pink-500 to-rose-500"
    },
    {
      hour: "sun 5pm",
      title: "awards & celebration",
      description: "Winner announcements and closing ceremony",
      icon: "🏆",
      color: "from-yellow-400 to-red-500"
    }
  ];

  return (
    <section id="timeline" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          ref={(el) => addToRefs(el, 'header')}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              weekend
            </span>
            <br />
            <span className="text-white">schedule</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your journey from idea to startup over one incredible weekend
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          
          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, `item${index}`)}
                className={`relative flex items-center transition-all duration-1000 ${
                  isVisible[`item${index}`] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-2xl mr-3`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                        {item.hour}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>

                {/* Central Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-900 z-10 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          ref={(el) => addToRefs(el, 'cta')}
          className={`text-center mt-20 transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30">
            <h3 className="text-3xl font-bold text-white mb-4">ready for the weekend?</h3>
            <p className="text-lg text-gray-200 mb-6">
              Join Genesis and experience the most intensive buildathon for high schoolers
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
