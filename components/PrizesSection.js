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
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <div className="relative w-full">
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
        <CornerText position="top-left" text="$1000" delay={0.2} className="text-white z-10" />
        <CornerText position="top-right" text="$500" delay={0.4} className="text-white z-10" />
        <CornerText position="bottom-left" text="$250" delay={0.6} className="text-white z-10" />
        <CornerText position="bottom-right" text="$100" delay={0.8} className="text-white z-10" />
      </div>
    </section>
  );
}
