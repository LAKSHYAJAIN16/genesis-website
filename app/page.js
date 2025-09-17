'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import TrophyCube from '../components/TrophyCube';
import AboutSection from '../components/AboutSection';

// Add CSS animations
const styles = `
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes wave {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100vw); }
  }
  
  @keyframes floatCTA {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  
  @keyframes fall {
    0% { transform: translateY(-100px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  
  @keyframes glow {
    0%, 100% { 
      opacity: 0.3;
      transform: scale(1);
    }
    50% { 
      opacity: 0.6;
      transform: scale(1.05);
    }
  }
  
  .animate-grid { animation: gridMove 20s ease-in-out infinite alternate; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
  .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
  .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
  .animate-glow { animation: glow 3s ease-in-out infinite; }
`;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Set hackathon date (example: 30 days from now)
    const hackathonDate = new Date();
    hackathonDate.setDate(hackathonDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate.getTime() - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // Start animation immediately
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds for faster animation
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calculate positions for corner texts
  const getCornerPosition = (corner, progress) => {
    const titleX = 50;
    const titleY = 20; // Position higher to prevent text cutoff
    
    const positions = {
      topLeft: { start: { x: 15, y: 20 }, end: { x: titleX - 5, y: titleY + 15 } }, // hackathon - slightly left and lower
      topRight: { start: { x: 85, y: 20 }, end: { x: titleX + 5, y: titleY + 15 } }, // bootcamp - slightly right and lower
      bottomLeft: { start: { x: 15, y: 80 }, end: { x: titleX, y: titleY } },
      bottomRight: { start: { x: 85, y: 80 }, end: { x: titleX, y: titleY } }
    };
    
    const pos = positions[corner];
    return {
      x: pos.start.x + (pos.end.x - pos.start.x) * progress,
      y: pos.start.y + (pos.end.y - pos.start.y) * progress
    };
  };

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-x-hidden ${poppins.className}`}>
      {/* Inject CSS animations */}
      <style jsx>{styles}</style>
      


      {/* Combined PCB + Shapes + Photos Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        
        
        {/* Floating Geometric Shapes - positioned to avoid overlaps */}
        <div className="absolute top-16 left-4 w-16 h-16 border border-white/40 rotate-45 animate-pulse"></div>
        <div className="absolute top-80 right-8 w-14 h-14 border border-blue-400/50 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-60 left-8 w-12 h-12 border border-green-400/40 rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-12 w-14 h-14 border border-purple-400/40 rounded-lg rotate-45 animate-bounce" style={{animationDuration: '5s', animationDelay: '3s'}}></div>
        
        {/* Code/Business Icons - repositioned to avoid overlaps */}
        <div className="absolute top-40 left-12 opacity-40">
          <div className="text-2xl text-blue-400 font-mono animate-pulse">{"{ }"}</div>
        </div>
        <div className="absolute top-24 right-24 opacity-35">
          <div className="text-3xl text-green-400 font-bold animate-bounce" style={{animationDuration: '4s'}}>$</div>
        </div>
        <div className="absolute bottom-80 left-16 opacity-40">
          <div className="text-xl text-cyan-400 font-mono animate-pulse" style={{animationDelay: '1s'}}>~/&gt;</div>
        </div>
        <div className="absolute bottom-40 right-4 opacity-30">
          <div className="text-2xl text-purple-400 animate-bounce" style={{animationDuration: '6s', animationDelay: '2s'}}>📈</div>
        </div>
        
        {/* Entrepreneur Photos - strategically positioned to avoid overlaps */}
        <div className="absolute top-12 left-60 opacity-45">
          <div className="w-20 h-20 rounded-lg border border-blue-400/50 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop&crop=face" 
              alt="Young entrepreneur coding"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="text-xs text-blue-400 mt-1 text-center font-mono">dorm room</div>
        </div>
        
        <div className="absolute top-48 right-40 opacity-45">
          <div className="w-18 h-18 rounded-full border border-green-400/50 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
              alt="Entrepreneur planning"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="text-xs text-green-400 mt-1 text-center font-mono">visionary</div>
        </div>
        
        <div className="absolute bottom-24 left-40 opacity-40">
          <div className="w-24 h-16 rounded border border-purple-400/50 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop" 
              alt="Garage startup"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="text-xs text-purple-400 mt-1 text-center font-mono">garage</div>
        </div>
        
        <div className="absolute bottom-12 right-60 opacity-40">
          <div className="w-20 h-20 rounded-lg border border-cyan-400/50 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=300&fit=crop" 
              alt="Late night coding"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="text-xs text-cyan-400 mt-1 text-center font-mono">3am code</div>
        </div>
      </div>



      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-8 bg-black/90 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          genesis
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-gray-400 transition-colors">about</a>
          <a href="#schedule" className="hover:text-gray-400 transition-colors">schedule</a>
          <a href="#prizes" className="hover:text-gray-400 transition-colors">prizes</a>
          <a href="#sponsors" className="hover:text-gray-400 transition-colors">sponsors</a>
        </div>
        <a href="https://form.jotform.com/252578355100252" target="_blank">
          <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer flex items-center gap-2">
            register now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </a>
      </nav>
      
      {/* Jagged separator line */}
      <div className="fixed top-[88px] left-0 right-0 z-40 h-2 bg-black">
        <svg className="w-full h-full" viewBox="0 0 1200 20" preserveAspectRatio="none">
          <path d="M0,10 L30,2 L60,18 L90,5 L120,15 L150,3 L180,17 L210,8 L240,12 L270,4 L300,16 L330,9 L360,13 L390,6 L420,14 L450,7 L480,11 L510,19 L540,1 L570,15 L600,8 L630,12 L660,5 L690,17 L720,3 L750,14 L780,9 L810,16 L840,6 L870,13 L900,4 L930,18 L960,7 L990,11 L1020,15 L1050,2 L1080,16 L1110,9 L1140,13 L1170,5 L1200,10 L1200,20 L0,20 Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>


      {/* Hero Section - No title initially */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Genesis title appears after collision */}
          <h1 className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent font-mono">
            {animationProgress < 0.2 && (
              <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                hackathon_
              </span>
            )}
            {animationProgress >= 0.2 && animationProgress < 0.4 && (
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                bootcamp_
              </span>
            )}
            {animationProgress >= 0.4 && animationProgress < 0.6 && (
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                launchpad_
              </span>
            )}
            {animationProgress >= 0.6 && animationProgress < 0.8 && (
              <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                incubator_
              </span>
            )}
            {animationProgress >= 0.8 && (
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                genesis
              </span>
            )}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            the first startup micro-accelerator in canada.
          </p>
          <div className="mb-12 text-gray-400">
            <p className="text-lg md:text-xl mb-2">March 15-17, 2024</p>
            <p className="text-md md:text-lg">Toronto, Ontario</p>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg cursor-pointer flex items-center gap-2">
              register for free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-colors">
              learn more
            </button>
          </div>
        </div>
      </main>

      {/* Sponsors Section */}
      <section id="sponsors" className="relative z-10 py-16 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            sponsored by
          </h2>
        </div>
        
        {/* Sponsor Ticker */}
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          <div className="flex items-center">
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">MS</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">G</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg">🍎</div>
            <div className="mx-4 h-8 w-20 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">META</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">AMZ</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">NV</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">T</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">AI</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">GH</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg text-gray-300">▲</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">S</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">F</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">N</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">D</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg text-gray-300">♪</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">NF</div>
          </div>
          <div className="flex items-center">
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">MS</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">G</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg">🍎</div>
            <div className="mx-4 h-8 w-20 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">META</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">AMZ</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">NV</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">T</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">AI</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">GH</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg text-gray-300">▲</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">S</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">F</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">N</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">D</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-lg text-gray-300">♪</div>
            <div className="mx-4 h-8 w-16 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-300">NF</div>
          </div>
        </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Schedule Section */}
      <section id="schedule" className="relative z-10 py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            event schedule
          </h2>
          <div className="space-y-6">
            {[
              { time: "friday 6:00 pm", event: "registration & check-in", desc: "get your swag and meet fellow hackers" },
              { time: "friday 7:00 pm", event: "opening ceremony", desc: "kick-off presentation and team formation" },
              { time: "friday 8:00 pm", event: "hacking begins!", desc: "start building your amazing projects" },
              { time: "saturday 12:00 pm", event: "lunch & workshops", desc: "refuel and learn new skills" },
              { time: "sunday 12:00 pm", event: "project submissions", desc: "submit your final projects" },
              { time: "sunday 3:00 pm", event: "presentations & judging", desc: "show off your creations" },
              { time: "sunday 5:00 pm", event: "awards ceremony", desc: "celebrate the winners!" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-white font-bold min-w-[140px]">{item.time}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.event}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="relative z-10 py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            prizes & awards
          </h2>
          
          {/* Trophy Section */}
          <div className="flex items-center justify-center gap-12 mb-16">
            <TrophyCube />
            <div className="w-1/2 pl-8">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
                the trophy
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">A custom-designed golden trophy awarded to the winning team of Genesis 2024.</p>
                <p>This prestigious award represents innovation, creativity, and technical excellence in the startup ecosystem.</p>
                <p>The trophy features a modern geometric design with premium gold finish, symbolizing the cutting-edge nature of the competition.</p>
                <p className="text-yellow-400 font-semibold">Interactive 3D model - click and drag to rotate!</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-8 border border-yellow-400/30 text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🥇</div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">1st place</h3>
              <p className="text-3xl font-bold mb-2 text-white">$5,000</p>
              <p className="text-gray-300">+ mentorship opportunities</p>
            </div>
            <div className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 backdrop-blur-sm rounded-xl p-8 border border-gray-400/30 text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🥈</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-400">2nd place</h3>
              <p className="text-3xl font-bold mb-2 text-white">$3,000</p>
              <p className="text-gray-300">+ tech gadgets</p>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 backdrop-blur-sm rounded-xl p-8 border border-orange-500/30 text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🥉</div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">3rd place</h3>
              <p className="text-3xl font-bold mb-2 text-white">$1,000</p>
              <p className="text-gray-300">+ swag packages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-black border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            genesis
          </div>
          <p className="text-gray-300 mb-6">ready to create the future?</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">twitter</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">discord</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">instagram</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">linkedin</a>
          </div>
          <button className="bg-gradient-to-r from-white to-gray-200 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg">
            join genesis 2024
          </button>
          <p className="text-gray-400 mt-8">© 2024 genesis hackathon. all rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
