'use client';

import { useEffect, useRef, useState } from 'react';

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
    <section id="about" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Statement */}
        <div className="text-center mb-20">
          <h2 
            ref={(el) => addToRefs(el, 'title')}
            className={`text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight transition-all duration-1000 ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            don't hack. <span className="italic font-serif relative inline-block">
              <span className="relative z-10">build.</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-lg animate-glow"></div>
            </span>
          </h2>
          <p 
            ref={(el) => addToRefs(el, 'subtitle')}
            className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Genesis is the first high school <span className="text-blue-400 font-semibold">buildathon</span> — where raw ideas transform into validated startups in just 48 hours.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Key Features */}
          <div className="space-y-8">
            <div 
              ref={(el) => addToRefs(el, 'feature1')}
              className={`flex items-start space-x-4 transition-all duration-1000 delay-300 ${
                isVisible.feature1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl text-white mb-2">bootcamp</h3>
                <p className="text-gray-300">Useful workshops by some of the most successful high school entrepreneurs.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => addToRefs(el, 'feature2')}
              className={`flex items-start space-x-4 transition-all duration-1000 delay-500 ${
                isVisible.feature2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl text-white mb-2">startup launchpad</h3>
                <p className="text-gray-300">On-the-spot business incorporation, professional launch videos and real-world resources.</p>
              </div>
            </div>
            
            <div 
              ref={(el) => addToRefs(el, 'feature3')}
              className={`flex items-start space-x-4 transition-all duration-1000 delay-700 ${
                isVisible.feature3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl text-white mb-2">mentorship network</h3>
                <p className="text-gray-300">Work alongside entrepreneurs, industry professionals, and experienced founders.</p>
              </div>
            </div>
          </div>

          {/* Right: Outcome Promise */}
          <div 
            ref={(el) => addToRefs(el, 'outcomes')}
            className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-1000 delay-400 ${
              isVisible.outcomes ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-2xl text-white mb-6">what you'll leave with</h3>
            <div className="space-y-4">
              {[
                'working MVP prototype',
                'complete business plan', 
                'incorporated company (optional)',
                'professional product media',
                'network of founders & mentors'
              ].map((item, index) => (
                <div 
                  key={index}
                  ref={(el) => addToRefs(el, `check${index}`)}
                  className={`flex items-center space-x-3 transition-all duration-700 ${
                    isVisible[`check${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
