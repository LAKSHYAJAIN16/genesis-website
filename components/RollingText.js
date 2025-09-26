'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const RollingText = ({ text, className = '', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const [animationKey, setAnimationKey] = useState(0);

  // Split text into individual characters
  const chars = displayText.split('');
  
  // Animation variants for each character
  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const letterVariants = {
    initial: { y: 0, opacity: 1 },
    hover: (i) => ({
      y: -8,
      opacity: 0,
      transition: {
        duration: 0.6,  // Slower duration for smoother effect
        ease: [0.4, 0, 0.2, 1],  // Smoother easing
        delay: i * 0.03  // Increased delay for more pronounced stagger
      }
    })
  };

  const newLetterVariants = {
    initial: { y: 6, opacity: 0 },
    hover: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,  // Slower duration for smoother effect
        ease: [0.4, 0, 0.2, 1],  // Smoother easing
        delay: 0.1 + (i * 0.03)  // Increased delay for more pronounced stagger
      }
    })
  };

  return (
    <motion.span 
      className={`inline-flex overflow-hidden h-6 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      key={animationKey}
    >
      <motion.span 
        className="inline-flex flex-col"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
      >
        {/* Current text moving up */}
        <motion.span className="inline-flex">
          {chars.map((char, i) => (
            <motion.span 
              key={`current-${i}`}
              custom={i}
              variants={letterVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
        
        {/* New text coming from bottom */}
        <motion.span className="inline-flex absolute">
          {chars.map((char, i) => (
            <motion.span 
              key={`new-${i}`}
              custom={i}
              variants={newLetterVariants}
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    </motion.span>
  );
};

export default RollingText;
