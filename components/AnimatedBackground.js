'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // Parallax effects
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });
  
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
  });
  
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 10]), {
    stiffness: 50,
    damping: 20,
  });

  // Mouse position tracking for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 0.5 + 0.1,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  // Grid lines
  const gridLines = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: (i / 20) * 100,
    opacity: 0.05 + (i % 5 === 0 ? 0.1 : 0),
    width: i % 5 === 0 ? 1.5 : 0.5,
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 70%, #000000 100%)',
      }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 opacity-70" />
      
      {/* Grid Layer */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {gridLines.map((line) => (
            <line
              key={`h-${line.id}`}
              x1={0}
              y1={line.x}
              x2={100}
              y2={line.x}
              stroke="#3b82f6"
              strokeWidth={line.width}
              strokeOpacity={line.opacity}
              className="transition-opacity duration-1000"
            />
          ))}
          {gridLines.map((line) => (
            <line
              key={`v-${line.id}`}
              x1={line.x}
              y1={0}
              x2={line.x}
              y2={100}
              stroke="#3b82f6"
              strokeWidth={line.width}
              strokeOpacity={line.opacity}
              className="transition-opacity duration-1000"
            />
          ))}
        </svg>
      </div>

      {/* Floating Shapes */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl"
        style={{
          y: y1,
          x: useTransform(() => mousePosition.x * 0.5),
          scale: 1.2,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl"
        style={{
          y: y2,
          x: useTransform(() => -mousePosition.x * 0.3),
          rotate,
        }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              x: useTransform(() => mousePosition.x * 0.3),
              y: useTransform(() => mousePosition.y * 0.3),
            }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
              x: [
                `${particle.x}%`,
                `${particle.x + (Math.random() * 10 - 5)}%`,
                `${particle.x}%`,
              ],
              opacity: [
                particle.opacity,
                particle.opacity * 1.5,
                particle.opacity,
              ],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              width: '200%',
              top: `${(i + 1) * 20}%`,
              left: '-50%',
              y: useTransform(scrollYProgress, [0, 1], [0, -100 * (i + 1)]),
              opacity: 0.1 + i * 0.05,
            }}
            animate={{
              x: ['-50%', '50%'],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
