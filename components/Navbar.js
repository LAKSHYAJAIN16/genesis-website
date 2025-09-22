'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  
  // Calculate scale based on scroll position (1 at top, 0.95 when scrolled)
  const scale = Math.max(0.95, 1 - Math.min(scrollY / 500, 0.05));
  // Calculate padding based on scroll position (normal at top, smaller when scrolled)
  const paddingY = Math.max(0.5, 1 - Math.min(scrollY / 1000, 0.5));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Set initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-sm transition-all duration-500 ease-out origin-top"
      style={{
        transform: `scaleY(${scale})`,
        transformOrigin: 'top',
        paddingTop: `${paddingY * 0.75}rem`,
        paddingBottom: `${paddingY * 0.75}rem`,
        boxShadow: scrollY > 10 ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
        opacity: 1 - Math.min(scrollY / 1000, 0.1), // Slight fade effect
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
      <a href="https://form.jotform.com/252578355100252" target="_blank" rel="noopener noreferrer">
        <button className="relative overflow-hidden bg-gradient-to-r from-white to-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2 group/btn">
          <span className="relative z-10">apply</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -translate-x-full group-hover/btn:translate-x-full"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </a>
      </nav>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
    </div>
  );
}
