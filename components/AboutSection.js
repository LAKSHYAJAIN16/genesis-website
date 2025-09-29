'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
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

  return (
    <section id="about" className="relative z-10 py-32 px-6 bg-white overflow-hidden" ref={sectionRef}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(255, 140, 0, 0.7);
          }
          50% {
            opacity: 0.8;
            text-shadow: 0 0 20px rgba(255, 140, 0, 0.9);
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <div className="flex items-center justify-center mb-6">
        <span className="flex items-center px-4 py-1 border border-gray-300 rounded-full text-gray-800 text-md font-semibold">
          <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
          Our Mission
        </span>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Hero Statement */}
        <div className="text-center mb-20">
          <h2
            ref={(el) => addToRefs(el, 'title')}
            className={`text-5xl md:text-8xl mb-8 leading-tight transition-all duration-1000 ${isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } text-black`}
          >
            don't hack. <span
              className="italic font-serif relative inline-block text-6xl md:text-9xl group cursor-pointer"
              style={{ transform: 'skewX(-8deg)', fontWeight: 500 }}
            >
              <span
                className="absolute top-0 left-0 group-hover:animate-jitter-1"
                style={{ color: '#ff0080', transform: 'translate(0px, 0px)' }}
              >
                build.
              </span>
              <span
                className="absolute top-0 left-0 group-hover:animate-jitter-2"
                style={{ color: '#40e0d0', transform: 'translate(3px, 3px)' }}
              >
                build.
              </span>
              <span
                className="relative z-10 group-hover:animate-jitter-3 animate-pulse"
                style={{
                  color: '#ff8c00',
                  transform: 'translate(6px, 6px)',
                  animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              >
                build.
              </span>
            </span>
          </h2>
          <p
            ref={(el) => addToRefs(el, 'subtitle')}
            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } text-gray-800`}
          >
            Genesis is the first high school <span className="text-blue-600 font-semibold">buildathon</span>—where you go from idea to startup in just 48 hours.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Key Features */}
          <div className="space-y-8">
            {[{
              id: 'feature1',
              title: 'launchpad',
              description: 'On-the-spot business incorporation, professional launch videos and real-world resources.',
              numberColor: 'from-blue-500 to-cyan-500'
            }, {
              id: 'feature2',
              title: 'bootcamp',
              description: 'Workshops by some of the most successful high school entrepreneurs.',
              numberColor: 'from-purple-500 to-pink-500'
            }, {
              id: 'feature3',
              title: 'mentorship network',
              description: 'Work alongside entrepreneurs, industry professionals, and experienced founders.',
              numberColor: 'from-green-500 to-emerald-500'
            }].map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => addToRefs(el, feature.id)}
                className={`flex items-start space-x-4 transition-all duration-1000 delay-${300 + idx * 200} ${isVisible[feature.id] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.numberColor} rounded-xl flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white text-xl">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Outcome Promise */}
          <div
            ref={(el) => addToRefs(el, 'outcomes')}
            className={`bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:scale-105 transition-all duration-1000 delay-400 ${isVisible.outcomes ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <h3 className="text-2xl text-black mb-6">what you'll leave with</h3>
            <div className="space-y-4">
              {[
                'working MVP prototype',
                'professional launch video',
                'incorporated company (optional)',
                'rudimentary business plan',
                'network of founders & mentors'
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => addToRefs(el, `check${index}`)}
                  className={`flex items-center space-x-3 transition-all duration-700 ${isVisible[`check${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center space-x-4 text-4xl md:text-5xl font-medium">
        {['hackathon', 'bootcamp', 'startup incubator'].map((word, index) => (
          <span
            key={index}
            className="relative inline-block"
          >
            <span 
              className={`transition-colors duration-1000 delay-${index * 1000} ${isVisible.title ? 'text-black' : 'text-gray-400'}`}
              style={{
                transitionDelay: `${index * 1}s`,
                transitionProperty: 'color',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {word}
            </span>
            {index < 2 && <span className="mx-2 text-gray-400">•</span>}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
