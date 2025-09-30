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
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const hackathonDate = new Date();
    hackathonDate.setDate(hackathonDate.getDate() + 30);

    const interval = setInterval(() => {
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
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7"
                        refX="8" refY="3.5" orient="auto" fill="currentColor" markerUnits="strokeWidth">
                        <polygon points="0 0, 10 3.5, 0 7" />
                      </marker>
                    </defs>
                    <g transform="scale(1,-1) translate(0,-100)">
                      <path
                        d="M10,70 C30,20 90,20 100,40"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        marker-end="url(#arrowhead)"
                      />
                    </g>
                  </svg>


                  <span className="absolute left-0 bottom-16 w-28 text-sm font-medium text-white">
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

      {/* Classic Ticket Section - Compact */}
      <section className="relative z-10 -mt-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
            padding: '4px',
            clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)'
          }}>
            <style>{`
              .ticket-arrow {
                width: 0;
                height: 0;
                border-left: 14px solid transparent;
                border-right: 14px solid transparent;
                border-top: 14px solid #1e3a8a;
              }
            `}</style>
            <div className="bg-blue-200 p-3 relative" style={{
              clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)'
            }}>
              <div className="text-center mb-2">
                <div className="text-blue-900 text-base font-bold mb-0.5">ADMIT ONE</div>
                <div className="text-blue-800 text-[10px] uppercase tracking-widest">GENESIS 2025</div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center p-2 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-[10px] font-semibold uppercase tracking-wider">Date</div>
                  <div className="text-blue-900 font-bold text-sm">OCT 15-17</div>
                  <div className="text-blue-800 text-[10px]">2025</div>
                </div>

                <div className="text-center p-2 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-[10px] font-semibold uppercase tracking-wider">Time</div>
                  <div className="text-blue-900 font-bold text-sm">9:00 AM</div>
                  <div className="text-blue-800 text-[10px]">to 8 PM</div>
                </div>

                <div className="text-center p-2 bg-white/90 rounded border border-blue-200 shadow-sm">
                  <div className="text-blue-700 text-[10px] font-semibold uppercase tracking-wider">Location</div>
                  <div className="text-blue-900 font-bold text-xs">TORONTO, ON</div>
                  <div className="text-blue-800 text-[10px]">Venue TBA</div>
                </div>
              </div>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-blue-300"></div>
                </div>
                <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-50 rounded-full border border-black"></div>
                <div className="absolute -right-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-50 rounded-full border border-black"></div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-900">48</div>
                  <div className="text-[10px] uppercase tracking-wider text-blue-700">Hours</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">200+</div>
                  <div className="text-[10px] uppercase tracking-wider text-blue-700">Hackers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">$10K+</div>
                  <div className="text-[10px] uppercase tracking-wider text-blue-700">Prizes</div>
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
      <PrizesSection />

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  );
}
