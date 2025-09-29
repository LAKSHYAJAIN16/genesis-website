'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import PrizesSection from '../components/PrizesSection';
import AboutSection from '../components/AboutSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TrophyCube from '@/components/TrophyCube';
import VideoBackground from '@/components/VideoBackground';

const styles = `
  html { scroll-behavior: smooth; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fadeIn 1s ease-out forwards; }

  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }

  @keyframes blob {
    0% { transform: translate(0px,0px) scale(1); }
    33% { transform: translate(30px,-50px) scale(1.1); }
    66% { transform: translate(-20px,20px) scale(0.9); }
    100% { transform: translate(0px,0px) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite; }

  .text-gold-400 { color: #fbbf24; }
  .border-gold-400 { border-color: rgba(251,191,36,0.3); }
`;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600','700','800','900'],
  display: 'swap',
});

export default function Home() {
  const [countdown, setCountdown] = useState({ days:0,hours:0,minutes:0,seconds:0 });
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const hackathonDate = new Date();
    hackathonDate.setDate(hackathonDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate.getTime() - now;
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance/(1000*60*60*24)),
          hours: Math.floor((distance%(1000*60*60*24))/(1000*60*60)),
          minutes: Math.floor((distance%(1000*60*60))/(1000*60)),
          seconds: Math.floor((distance%(1000*60))/1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-hidden ${poppins.className}`}>
      <style jsx>{styles}</style>

      {/* Navbar */}
      <Navbar className="relative z-10" />

      {/* Hero Section */}
      <section className="mt-8 relative px-8 py-20 z-10">
        <div className={`w-full max-w-7xl mx-auto transition-opacity duration-1000 ${showHero ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Side - Text Content */}
            <div className="text-white lg:w-1/2">
              <h1 className="mb-6 font-bold tracking-tighter leading-[0.9]" 
                  style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}>
                genesis
              </h1>
              <p className="text-2xl md:text-3xl mb-6 max-w-xl mt-16">
                Canada's first high school buildathon.
              </p>

              {/* Countdown */}
              <div className="flex gap-4 text-xl font-mono mb-12">
                <div>{countdown.days}d</div>
                <div>{countdown.hours}h</div>
                <div>{countdown.minutes}m</div>
                <div>{countdown.seconds}s</div>
              </div>

              {/* CTA Buttons - Side by Side */}
              <div className="flex flex-row gap-4">
                <a href="#register" className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors whitespace-nowrap">
                  Register Now
                </a>
                <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors whitespace-nowrap">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-48 relative">
              {/* Less Curved Arrow - From Bottom Left */}
              <div className="absolute -left-32 bottom-1/4 transform translate-y-1/2 hidden lg:block">
                <div className="relative">
                  <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M5,40 C5,40 20,60 50,50 C80,40 85,10 85,10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M80 10L90 5L85 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  <span className="absolute left-0 bottom-0 w-28 text-sm font-medium text-white">
                    Watch our award winning video!
                  </span>
                </div>
              </div>
              
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 transform transition-all duration-500 hover:scale-[1.02]">
                <VideoBackground />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classic Ticket Section */}
      <section className="relative z-10 -mt-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
            padding: '6px',
            clipPath: 'polygon(30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px), 0% 30px)'
          }}>
            <style>{`
              .ticket-arrow {
                width: 0;
                height: 0;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                border-top: 20px solid #1e3a8a;
              }
              .ticket-section {
                text-wrap: normal;
              }
              .ticket-video {
                position: relative;
                top: -100px;
              }
            `}</style>
            <div className="bg-blue-200 p-4 relative" style={{
              clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)'
            }}>
              <div className="text-center mb-4">
                <div className="text-blue-900 text-xl font-bold mb-1">ADMIT ONE</div>
                <div className="text-blue-800 text-xs uppercase tracking-widest">GENESIS 2025</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-1">Date</div>
                  <div className="text-blue-900 font-bold text-lg">OCT 15-17</div>
                  <div className="text-blue-800 text-xs">2025</div>
                </div>
                
                <div className="text-center p-3 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-1">Time</div>
                  <div className="text-blue-900 font-bold text-lg">9:00 AM</div>
                  <div className="text-blue-800 text-xs">to 8:00 PM</div>
                </div>
                
                <div className="text-center p-3 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-1">Location</div>
                  <div className="text-blue-900 font-bold text-base">TORONTO, ON</div>
                  <div className="text-blue-800 text-xs">Venue TBA</div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-blue-300"></div>
                </div>
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-50 rounded-full border-2 border-black"></div>
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-50 rounded-full border-2 border-black"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-900">48</div>
                  <div className="text-xs uppercase tracking-wider text-blue-700">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">200+</div>
                  <div className="text-xs uppercase tracking-wider text-blue-700">Hackers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">$10K+</div>
                  <div className="text-xs uppercase tracking-wider text-blue-700">Prizes</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a 
                  href="#register" 
                  className="inline-block px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition-all duration-200"
                >
                  Claim Your Ticket
                </a>
              </div>
              
              <div className="absolute top-4 right-4 text-blue-200 text-2xl">★</div>
              <div className="absolute bottom-4 left-4 text-blue-200 text-2xl">★</div>
              <div className="absolute top-4 left-4 text-blue-200 text-2xl">★</div>
              <div className="absolute bottom-4 right-4 text-blue-200 text-2xl">★</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Prizes Section */}
      <section id="prizes" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15]">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div className="text-center mb-20" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
            <h2 className="text-4xl md:text-6xl mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-bold">prizes</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Compete for amazing prizes and the chance to showcase your startup to investors.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mb-32">
            <div className="flex-shrink-0"><TrophyCube /></div>
            <div className="max-w-2xl">
              <h3 className="text-4xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6 font-bold">
                the legendary unicorn trophy
              </h3>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>A custom-designed golden unicorn trophy that represents the magical transformation from idea to startup.</p>
                <p>Crafted with premium materials and featuring intricate details, this trophy will become a centerpiece in your journey as an entrepreneur.</p>
                <p className="text-yellow-400 flex items-center gap-2 opacity-80">
                  <span className="inline-block animate-bounce">🎮</span> Interactive 3D model - click and drag to rotate!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  );
}
