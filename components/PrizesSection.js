'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import TrophyCube from './TrophyCube';

const CornerText = ({ position, text, delay = 0 }) => {
  const positions = {
    'top-left': { top: '5%', left: '5%', textAlign: 'left' },
    'top-right': { top: '5%', right: '5%', textAlign: 'right' },
    'bottom-left': { bottom: '5%', left: '5%', textAlign: 'left' },
    'bottom-right': { bottom: '5%', right: '5%', textAlign: 'right' }
  };

  return (
    <motion.div
      className="absolute text-white text-lg md:text-xl font-medium"
      style={positions[position]}
      initial={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {text}
    </motion.div>
  );
};

export default function PrizesSection() {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      id="prizes" 
      className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900 overflow-hidden flex items-center justify-center"
    >
      {/* Section Title */}
      <motion.h2 
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl font-bold text-white text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        real prizes
      </motion.h2>

      {/* Trophy in the center */}
      <div className="w-full h-[60vh] max-w-4xl mx-auto relative z-10">
        <TrophyCube />
      </div>

      {/* Corner Text Elements */}
      <CornerText 
        position="top-left" 
        text="Grand Prize"
        delay={0.2}
      />
      <CornerText 
        position="top-right" 
        text="$10,000"
        delay={0.4}
      />
      <CornerText 
        position="bottom-left" 
        text="Best in Show"
        delay={0.6}
      />
      <CornerText 
        position="bottom-right" 
        text="Special Recognition"
        delay={0.8}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </section>
  );
}
