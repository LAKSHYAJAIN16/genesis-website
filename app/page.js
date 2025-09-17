'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import TrophyCube from '../components/TrophyCube';
import AboutSection from '../components/AboutSection';
import Timeline from '../components/Timeline';
import WorkshopLeaders from '../components/WorkshopLeaders';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

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
  
  @keyframes scroll-leaders {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
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
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes glitch-1 {
    0%, 100% { transform: translate(0px, 0px); }
    20% { transform: translate(2px, -1px); }
    40% { transform: translate(-1px, 2px); }
    60% { transform: translate(3px, 1px); }
    80% { transform: translate(1px, -2px); }
  }
  
  @keyframes glitch-2 {
    0%, 100% { transform: translate(3px, 3px); }
    25% { transform: translate(6px, 1px); }
    50% { transform: translate(1px, 6px); }
    75% { transform: translate(7px, 4px); }
  }
  
  @keyframes glitch-3 {
    0%, 100% { transform: translate(6px, 6px); }
    15% { transform: translate(9px, 4px); }
    35% { transform: translate(4px, 9px); }
    55% { transform: translate(10px, 7px); }
    75% { transform: translate(7px, 10px); }
  }
  
  @keyframes jitter-1 {
    0%, 100% { transform: translate(0px, 0px); }
    10% { transform: translate(9px, -6px); }
    20% { transform: translate(-6px, 9px); }
    30% { transform: translate(12px, 6px); }
    40% { transform: translate(-9px, -12px); }
    50% { transform: translate(6px, 0px); }
    60% { transform: translate(-12px, 3px); }
    70% { transform: translate(3px, 12px); }
    80% { transform: translate(0px, -9px); }
    90% { transform: translate(9px, -3px); }
  }
  
  @keyframes jitter-2 {
    0%, 100% { transform: translate(3px, 3px); }
    12% { transform: translate(21px, 0px); }
    24% { transform: translate(-3px, 21px); }
    36% { transform: translate(24px, 18px); }
    48% { transform: translate(-6px, -3px); }
    60% { transform: translate(18px, 3px); }
    72% { transform: translate(0px, 15px); }
    84% { transform: translate(15px, 24px); }
    96% { transform: translate(3px, -6px); }
  }
  
  @keyframes jitter-3 {
    0%, 100% { transform: translate(6px, 6px); }
    8% { transform: translate(30px, 6px); }
    16% { transform: translate(6px, 30px); }
    24% { transform: translate(33px, 27px); }
    32% { transform: translate(3px, 3px); }
    40% { transform: translate(27px, 9px); }
    48% { transform: translate(9px, 27px); }
    56% { transform: translate(24px, 33px); }
    64% { transform: translate(12px, 0px); }
    72% { transform: translate(36px, 12px); }
    80% { transform: translate(0px, 24px); }
    88% { transform: translate(30px, 30px); }
    96% { transform: translate(6px, 6px); }
  }
  
  .animate-grid { animation: gridMove 20s ease-in-out infinite alternate; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
  .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
  .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
  .animate-glow { animation: glow 3s ease-in-out infinite; }
  .animate-glitch-1 { animation: glitch-1 0.3s ease-in-out infinite; }
  .animate-glitch-2 { animation: glitch-2 0.4s ease-in-out infinite; }
  .animate-glitch-3 { animation: glitch-3 0.35s ease-in-out infinite; }
  .animate-jitter-1 { animation: jitter-1 2s ease-in-out infinite; }
  .animate-jitter-2 { animation: jitter-2 2.5s ease-in-out infinite; }
  .animate-jitter-3 { animation: jitter-3 3s ease-in-out infinite; }
  .animate-scroll-leaders { animation: scroll-leaders 40s linear infinite; }
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
        
        
        {/* Holographic Grid Background */}
        <div className="absolute inset-0 opacity-25">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#00FFFF', stopOpacity: 0.8}} />
                <stop offset="50%" style={{stopColor: '#0080FF', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: '#8000FF', stopOpacity: 0.4}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* 3D Perspective Grid - Horizontal Lines */}
            <g stroke="url(#neonGradient)" strokeWidth="0.2" fill="none" filter="url(#glow)">
              {/* Top section - closer lines */}
              <line x1="0" y1="20" x2="100" y2="20" className="animate-pulse" style={{animationDelay: '0s'}} />
              <line x1="5" y1="25" x2="95" y2="25" className="animate-pulse" style={{animationDelay: '0.5s'}} />
              <line x1="10" y1="30" x2="90" y2="30" className="animate-pulse" style={{animationDelay: '1s'}} />
              <line x1="15" y1="35" x2="85" y2="35" className="animate-pulse" style={{animationDelay: '1.5s'}} />
              <line x1="20" y1="40" x2="80" y2="40" className="animate-pulse" style={{animationDelay: '2s'}} />
              <line x1="25" y1="45" x2="75" y2="45" className="animate-pulse" style={{animationDelay: '2.5s'}} />
              <line x1="30" y1="50" x2="70" y2="50" className="animate-pulse" style={{animationDelay: '3s'}} />
              
              {/* Bottom section - farther lines */}
              <line x1="35" y1="55" x2="65" y2="55" className="animate-pulse" style={{animationDelay: '0.2s'}} />
              <line x1="40" y1="60" x2="60" y2="60" className="animate-pulse" style={{animationDelay: '0.7s'}} />
              <line x1="42" y1="65" x2="58" y2="65" className="animate-pulse" style={{animationDelay: '1.2s'}} />
              <line x1="44" y1="70" x2="56" y2="70" className="animate-pulse" style={{animationDelay: '1.7s'}} />
              <line x1="46" y1="75" x2="54" y2="75" className="animate-pulse" style={{animationDelay: '2.2s'}} />
              <line x1="48" y1="80" x2="52" y2="80" className="animate-pulse" style={{animationDelay: '2.7s'}} />
            </g>
            
            {/* Vertical Grid Lines - Perspective */}
            <g stroke="url(#neonGradient)" strokeWidth="0.15" fill="none" filter="url(#glow)">
              <line x1="10" y1="20" x2="35" y2="80" className="animate-pulse" style={{animationDelay: '0.3s'}} />
              <line x1="20" y1="20" x2="40" y2="80" className="animate-pulse" style={{animationDelay: '0.8s'}} />
              <line x1="30" y1="20" x2="45" y2="80" className="animate-pulse" style={{animationDelay: '1.3s'}} />
              <line x1="40" y1="20" x2="48" y2="80" className="animate-pulse" style={{animationDelay: '1.8s'}} />
              <line x1="50" y1="20" x2="50" y2="80" className="animate-pulse" style={{animationDelay: '2.3s'}} />
              <line x1="60" y1="20" x2="52" y2="80" className="animate-pulse" style={{animationDelay: '2.8s'}} />
              <line x1="70" y1="20" x2="55" y2="80" className="animate-pulse" style={{animationDelay: '0.1s'}} />
              <line x1="80" y1="20" x2="60" y2="80" className="animate-pulse" style={{animationDelay: '0.6s'}} />
              <line x1="90" y1="20" x2="65" y2="80" className="animate-pulse" style={{animationDelay: '1.1s'}} />
            </g>
            
            {/* Glowing intersection points */}
            <g fill="url(#neonGradient)" filter="url(#glow)">
              <circle cx="30" cy="30" r="0.5" className="animate-pulse" style={{animationDelay: '1s'}} />
              <circle cx="50" cy="40" r="0.8" className="animate-pulse" style={{animationDelay: '2s'}} />
              <circle cx="70" cy="35" r="0.6" className="animate-pulse" style={{animationDelay: '0.5s'}} />
              <circle cx="40" cy="50" r="0.7" className="animate-pulse" style={{animationDelay: '1.5s'}} />
              <circle cx="60" cy="45" r="0.5" className="animate-pulse" style={{animationDelay: '2.5s'}} />
              <circle cx="50" cy="60" r="0.9" className="animate-pulse" style={{animationDelay: '3s'}} />
            </g>
          </svg>
        </div>
        
        {/* Floating Holographic Elements */}
        <div className="absolute top-32 right-20 opacity-40">
          <div className="w-16 h-16 border-2 border-cyan-400 rounded-lg animate-float" style={{filter: 'drop-shadow(0 0 10px #00FFFF)'}}>
            <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 opacity-40">
          <div className="w-12 h-12 border-2 border-purple-400 rounded-full animate-float" style={{filter: 'drop-shadow(0 0 8px #8000FF)', animationDelay: '2s'}}>
            <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute top-60 left-1/3 opacity-30">
          <div className="w-8 h-20 border-2 border-blue-400 rounded animate-float" style={{filter: 'drop-shadow(0 0 6px #0080FF)', animationDelay: '1s'}}>
            <div className="w-full h-full bg-gradient-to-t from-blue-400/20 to-cyan-500/20 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute bottom-48 right-1/4 opacity-35">
          <div className="w-14 h-8 border-2 border-teal-400 rounded-lg animate-float" style={{filter: 'drop-shadow(0 0 7px #14B8A6)', animationDelay: '3s'}}>
            <div className="w-full h-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>



      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-8 bg-black/90 backdrop-blur-sm">
        <div className="text-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          genesis
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="relative group hover:text-gray-400 transition-colors">
            about
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#schedule" className="relative group hover:text-gray-400 transition-colors">
            schedule
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#prizes" className="relative group hover:text-gray-400 transition-colors">
            prizes
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#faq" className="relative group hover:text-gray-400 transition-colors">
            faq
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#sponsors" className="relative group hover:text-gray-400 transition-colors">
            sponsors
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </a>
        </div>
        <a href="https://form.jotform.com/252578355100252" target="_blank">
          <button className="bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer flex items-center gap-2">
            register
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


      {/* Sponsors Ticker */}
      <div className="relative z-10 py-8 bg-black/30 backdrop-blur-sm">
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
      </div>

      {/* Hero Section - No title initially */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-8">
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


      {/* About Section */}
      <AboutSection />

      {/* Timeline Section */}
      <Timeline />

      {/* Workshop Leaders Section */}
      <WorkshopLeaders />

      {/* FAQ Section */}
      <FAQ />

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
      <Footer />
    </div>
  );
}
