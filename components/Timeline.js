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

        {/* Compact Grid Format */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Friday */}
          <div 
            ref={(el) => addToRefs(el, 'friday')}
            className={`bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 transition-all duration-1000 ${
              isVisible.friday ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
              <span className="text-3xl mr-3">🌙</span>
              friday night
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🎯</span>
                <div>
                  <div className="text-white font-semibold">6pm - check-in</div>
                  <div className="text-gray-300 text-sm">registration & networking</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🚀</span>
                <div>
                  <div className="text-white font-semibold">8pm - kickoff</div>
                  <div className="text-gray-300 text-sm">opening ceremony</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">💡</span>
                <div>
                  <div className="text-white font-semibold">10pm - ideation</div>
                  <div className="text-gray-300 text-sm">brainstorm & validate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Saturday */}
          <div 
            ref={(el) => addToRefs(el, 'saturday')}
            className={`bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 transition-all duration-1000 ${
              isVisible.saturday ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              saturday
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔨</span>
                <div>
                  <div className="text-white font-semibold">all day - building</div>
                  <div className="text-gray-300 text-sm">intensive development</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">👥</span>
                <div>
                  <div className="text-white font-semibold">mentorship</div>
                  <div className="text-gray-300 text-sm">1-on-1 guidance</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">📈</span>
                <div>
                  <div className="text-white font-semibold">8pm - pitch prep</div>
                  <div className="text-gray-300 text-sm">presentation skills</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div 
            ref={(el) => addToRefs(el, 'sunday')}
            className={`bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30 transition-all duration-1000 ${
              isVisible.sunday ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center">
              <span className="text-3xl mr-3">🏆</span>
              sunday
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🎤</span>
                <div>
                  <div className="text-white font-semibold">2pm - demos</div>
                  <div className="text-gray-300 text-sm">final presentations</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">⭐</span>
                <div>
                  <div className="text-white font-semibold">4pm - judging</div>
                  <div className="text-gray-300 text-sm">evaluation period</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🎉</span>
                <div>
                  <div className="text-white font-semibold">5pm - awards</div>
                  <div className="text-gray-300 text-sm">winners & celebration</div>
                </div>
              </div>
            </div>
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
