'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import TrophyCube from '../components/TrophyCube';
import AboutSection from '../components/AboutSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import Navbar from '../components/Navbar';

// Add CSS animations
const styles = `
  html {
    scroll-behavior: smooth;
  }
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
  
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
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
  .animate-spin-slow { animation: spin 20s linear infinite; }
  .animate-spin-reverse { animation: spin 15s linear infinite reverse; }
  .animate-particle { animation: particle 10s linear infinite; }
  
  @keyframes particle {
    0% { 
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% { 
      transform: translateY(-100vh) scale(1);
      opacity: 0;
    }
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
      
      {/* New Animated Background */}
      <AnimatedBackground />

      
      {/* Floating Element */}
      <div className="fixed bottom-48 right-1/4 opacity-35 z-10">
        <div className="w-14 h-8 border-2 border-teal-400 rounded-lg animate-float" style={{filter: 'drop-shadow(0 0 7px #14B8A6)', animationDelay: '3s'}}>
          <div className="w-full h-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />


      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated title */}
          <motion.h1 
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {animationProgress < 0.2 && (
              <motion.span 
                className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                hackathon_
              </motion.span>
            )}
            {animationProgress >= 0.2 && animationProgress < 0.4 && (
              <motion.span 
                className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                bootcamp_
              </motion.span>
            )}
            {animationProgress >= 0.4 && animationProgress < 0.6 && (
              <motion.span 
                className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                launchpad_
              </motion.span>
            )}
            {animationProgress >= 0.6 && animationProgress < 0.8 && (
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                incubator_
              </motion.span>
            )}
            {animationProgress >= 0.8 && (
              <motion.span 
                className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                genesis
              </motion.span>
            )}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-4 text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            the first high school buildathon.
          </motion.p>
          
          <motion.div 
            className="mb-12 text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-lg md:text-xl mb-2">October 10-12, 2025</p>
            <p className="text-md md:text-lg">Toronto, Ontario</p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a 
              href="#register" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-full hover:opacity-90 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
            <motion.a 
              href="#about" 
              className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Prizes Section */}
      <section id="prizes" className="relative z-10 py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-bold">
              prizes
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Compete for amazing prizes and the chance to showcase your startup to investors.
            </p>
          </motion.div>

          {/* Trophy Showcase */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mb-32">
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TrophyCube />
            </motion.div>
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-4xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6 font-bold">
                the legendary unicorn trophy
              </h3>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>A custom-designed golden unicorn trophy that represents the magical transformation from idea to startup.</p>
                <p>Crafted with premium materials and featuring intricate details, this trophy will become a centerpiece in your journey as an entrepreneur.</p>
                <motion.p 
                  className="text-yellow-400 flex items-center gap-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="inline-block animate-bounce">🎮</span> Interactive 3D model - click and drag to rotate!
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Prize Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Prize Card 2 */}
            <motion.div 
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Premium Resources</h3>
                <p className="text-gray-300">Receive premium design assets, development tools, and cloud credits to build your startup.</p>
              </div>
            </motion.div>

            {/* Prize Card 3 */}
            <motion.div 
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Seed Funding</h3>
                <p className="text-gray-300">Win seed funding to help turn your project into a real business.</p>
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div 
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full filter blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </section>

      {/* Signup Section */}
      <section className="relative z-10 py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ready to build?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join Genesis 2025 and transform your idea into a real startup in just 48 hours.
          </p>
          <a href="https://form.jotform.com/252578355100252" target="_blank">
            <button className="bg-blue-400 text-black px-12 py-6 rounded-full text-xl font-bold cursor-pointer">
              Register for Free
              <svg className="w-6 h-6 ml-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}