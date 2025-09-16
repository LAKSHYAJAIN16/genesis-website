'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';

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
  
  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
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
      


      {/* Star Background */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(150)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const seed = i * 9301 + 49297;
          const random1 = ((seed % 233280) / 233280);
          const random2 = (((seed * 9301) % 233280) / 233280);
          const random3 = (((seed * 9301 * 9301) % 233280) / 233280);
          const random4 = (((seed * 9301 * 9301 * 9301) % 233280) / 233280);
          const random5 = (((seed * 9301 * 9301 * 9301 * 9301) % 233280) / 233280);
          
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${random1 * 3 + 1}px`,
                height: `${random2 * 3 + 1}px`,
                left: `${random3 * 100}%`,
                top: `${random4 * 100}%`,
                opacity: random5 * 0.8 + 0.2,
                animation: `pulse ${random1 * 4 + 2}s ease-in-out infinite`,
                animationDelay: `${random2 * 2}s`
              }}
            />
          );
        })}
      </div>


      {/* Corner texts that animate to center */}
<div className="fixed inset-0 pointer-events-none z-50 overflow-visible">
        {/* hackathon - Top Left */}
        <div 
          className="absolute text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent transition-all duration-2000 ease-out"
          style={{
            left: `${getCornerPosition('topLeft', animationProgress).x}%`,
            top: `${getCornerPosition('topLeft', animationProgress).y}%`,
            transform: `translate(-50%, -50%) scale(${animationProgress > 0.7 ? 0 : 1})`,
            opacity: animationProgress > 0.7 ? 0 : 1,
            display: animationProgress > 0.7 ? 'none' : 'block'
          }}
        >
          hackathon
        </div>

        {/* bootcamp - Top Right */}
        <div 
          className="absolute text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent transition-all duration-2000 ease-out"
          style={{
            left: `${getCornerPosition('topRight', animationProgress).x}%`,
            top: `${getCornerPosition('topRight', animationProgress).y}%`,
            transform: `translate(-50%, -50%) scale(${animationProgress > 0.7 ? 0 : 1})`,
            opacity: animationProgress > 0.7 ? 0 : 1,
            display: animationProgress > 0.7 ? 'none' : 'block'
          }}
        >
          bootcamp
        </div>

        {/* launchpad - Bottom Left */}
        <div 
          className="absolute text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent transition-all duration-2000 ease-out"
          style={{
            left: `${getCornerPosition('bottomLeft', animationProgress).x}%`,
            top: `${getCornerPosition('bottomLeft', animationProgress).y}%`,
            transform: `translate(-50%, -50%) scale(${animationProgress > 0.7 ? 0 : 1})`,
            opacity: animationProgress > 0.7 ? 0 : 1,
            display: animationProgress > 0.7 ? 'none' : 'block'
          }}
        >
          launchpad
        </div>

        {/* incubator - Bottom Right */}
        <div 
          className="absolute text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent transition-all duration-2000 ease-out"
          style={{
            left: `${getCornerPosition('bottomRight', animationProgress).x}%`,
            top: `${getCornerPosition('bottomRight', animationProgress).y}%`,
            transform: `translate(-50%, -50%) scale(${animationProgress > 0.7 ? 0 : 1})`,
            opacity: animationProgress > 0.7 ? 0 : 1,
            display: animationProgress > 0.7 ? 'none' : 'block'
          }}
        >
          incubator
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
        <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer flex items-center gap-2">
          register now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </nav>
      
      {/* Jagged separator line */}
      <div className="fixed top-[88px] left-0 right-0 z-40 h-2 bg-black">
        <svg className="w-full h-full" viewBox="0 0 1200 20" preserveAspectRatio="none">
          <path d="M0,10 L30,2 L60,18 L90,5 L120,15 L150,3 L180,17 L210,8 L240,12 L270,4 L300,16 L330,9 L360,13 L390,6 L420,14 L450,7 L480,11 L510,19 L540,1 L570,15 L600,8 L630,12 L660,5 L690,17 L720,3 L750,14 L780,9 L810,16 L840,6 L870,13 L900,4 L930,18 L960,7 L990,11 L1020,15 L1050,2 L1080,16 L1110,9 L1140,13 L1170,5 L1200,10 L1200,20 L0,20 Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>

      {/* Sponsor Ticker */}
      <div className="fixed top-[100px] left-0 right-0 z-30 bg-black/50 backdrop-blur-sm py-3 overflow-hidden">
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

      {/* Hero Section - No title initially */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-32">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Genesis title appears after collision */}
          <h1 
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
            style={{
              transform: `scale(${animationProgress > 0.7 ? 1 : 0.9})`,
              opacity: animationProgress > 0.7 ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              lineHeight: '1.2',
              paddingBottom: '0.5rem',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            genesis
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">
            the first startup micro-accelerator in canada.
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl">
            join us for 48 hours of coding, creativity, and collaboration. build the future, one line of code at a time.
          </p>


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



      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            about genesis
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4 text-white">innovation</h3>
              <p className="text-gray-300">push the boundaries of technology and create solutions that matter.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-4 text-white">collaboration</h3>
              <p className="text-gray-300">work with talented individuals from diverse backgrounds and skill sets.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-4 text-white">competition</h3>
              <p className="text-gray-300">compete for amazing prizes and recognition in the tech community.</p>
            </div>
          </div>
        </div>
      </section>

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
