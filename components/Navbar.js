'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  
  // Calculate scale based on scroll position (1 at top, 0.95 when scrolled)
  const scale = Math.max(0.95, 1 - Math.min(scrollY / 500, 0.05));
  // Calculate padding based on scroll position (normal at top, smaller when scrolled)
  const paddingY = Math.max(0.5, 1 - Math.min(scrollY / 1000, 0.5));

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only update state if scroll position changed significantly
          if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
              // Scrolling down
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
              // Scrolling up
              setIsVisible(true);
            }
            
            // Always show navbar at the top of the page
            if (currentScrollY < 10) {
              setIsVisible(true);
            }
            
            lastScrollY.current = currentScrollY;
            setScrollY(currentScrollY);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    
    // Use passive scroll for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        y: isVisible ? 0 : '-100%',
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        damping: 25,  // Increased damping for less oscillation
        stiffness: 300,  // Increased stiffness for snappier movement
        mass: 0.5  // Lower mass for faster response
      }}
    >
      <div 
        className="w-full bg-black/70 backdrop-blur-xl transition-all duration-300"
        style={{
          paddingTop: `${paddingY * 0.75}rem`,
          paddingBottom: `${paddingY * 0.75}rem`,
          boxShadow: scrollY > 10 ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
        }}
    >
      <nav className="container mx-auto flex justify-between items-center py-3 px-6 md:px-8">
      <a 
        href="/" 
        className="text-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block"
      >
        genesis
      </a>
      <div className="hidden md:flex space-x-8">
        <a 
          href="#about" 
          className={`relative group transition-all duration-300 ${
            isActive('/#about') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          about
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
            isActive('/#about') ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></div>
        </a>
        <a 
          href="#prizes" 
          className={`relative group transition-all duration-300 ${
            isActive('/#prizes') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          prizes
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
            isActive('/#prizes') ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></div>
        </a>
        <a 
          href="#faq" 
          className={`relative group transition-all duration-300 ${
            isActive('/#faq') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          faq
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400 transition-all duration-300 ${
            isActive('/#faq') ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></div>
        </a>
      </div>
      <a href="/application" className="inline-block">
        <button className="relative overflow-hidden bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2 group/btn">
          <span className="relative z-10">apply</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -translate-x-full group-hover/btn:translate-x-full"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </a>
      </nav>
      </div>
    </motion.div>
  );
}
