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
            className={`text-5xl md:text-7xl mb-8 text-white leading-tight transition-all duration-1000 ${
              isVisible.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            don't hack. <span 
              className="italic font-serif relative inline-block text-6xl md:text-8xl group cursor-pointer" 
              style={{transform: 'skewX(-8deg)'}}
            >
              <span 
                className="absolute top-0 left-0 group-hover:animate-jitter-1" 
                style={{color: '#ff0080', transform: 'translate(0px, 0px)'}}
              >
                build.
              </span>
              <span 
                className="absolute top-0 left-0 group-hover:animate-jitter-2" 
                style={{color: '#40e0d0', transform: 'translate(3px, 3px)'}}
              >
                build.
              </span>
              <span 
                className="relative z-10 group-hover:animate-jitter-3" 
                style={{color: '#ff8c00', transform: 'translate(6px, 6px)'}}
              >
                build.
              </span>
            </span>
          </h2>
          <p 
            ref={(el) => addToRefs(el, 'subtitle')}
            className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Genesis is the first high school <span className="text-blue-400 font-semibold">buildathon</span>—where you go from idea to startup in just 48 hours.
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
                <h3 className="text-xl text-white mb-2">launchpad</h3>
                <p className="text-gray-300">On-the-spot business incorporation, professional launch videos and real-world resources.</p>
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
                <h3 className="text-xl text-white mb-2">bootcamp</h3>
                <p className="text-gray-300">Workshops by some of the most successful high school entrepreneurs.</p>
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
                'professional launch video', 
                'incorporated company (optional)',
                'rudimentary business plan',
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

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20 relative">
          {/* Glass effect background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 -left-10 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-2/3 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Exclusive Access Card */}
          <motion.div 
            ref={(el) => addToRefs(el, 'exclusiveAccess')}
            className={`group relative isolate overflow-hidden rounded-2xl p-6 transition-all duration-700 ${
              isVisible.exclusiveAccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Exclusive Access</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Early access to our startup accelerator program and mentorship from industry experts.</p>
              <div className="mt-4 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-xs text-blue-400 font-medium">Learn more →</span>
              </div>
            </div>
          </motion.div>

          {/* Premium Resources Card */}
          <motion.div 
            className={`group relative isolate overflow-hidden rounded-2xl p-6 transition-all duration-700 ${
              isVisible.exclusiveAccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Premium Resources</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Access to premium design assets, development tools, and cloud credits to build your startup.</p>
              <div className="mt-4 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-xs text-purple-400 font-medium">View resources →</span>
              </div>
            </div>
          </motion.div>

          {/* Seed Funding Card */}
          <motion.div 
            className={`group relative isolate overflow-hidden rounded-2xl p-6 transition-all duration-700 ${
              isVisible.exclusiveAccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Seed Funding</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Opportunity to win seed funding to help turn your project into a real business.</p>
              <div className="mt-4 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-xs text-yellow-400 font-medium">See details →</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
