'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // Mouse position and interaction
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Parallax effects with smoother spring physics
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });
  
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -75]), {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });
  
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 5]), {
    stiffness: 40,
    damping: 15,
  });
  
  // Enhanced mouse position tracking with inertia
  const updateMousePosition = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    
    mousePosition.current = { x, y };
    mouseX.set(x * 0.5);
    mouseY.set(y * 0.5);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, [mouseX, mouseY]);
  
  // Set up event listeners with passive for better performance
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  // State for particles and connections
  const [particles, setParticles] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [hoveredParticle, setHoveredParticle] = useState(null);

  // Initialize particles with more variety
  useEffect(() => {
    setIsClient(true);
    
    // Generate particles with different types and behaviors
    const particleTypes = [
      { color: 'rgba(56, 189, 248, 0.8)', size: 1.5, speed: 0.2 },
      { color: 'rgba(167, 139, 250, 0.8)', size: 1.2, speed: 0.15 },
      { color: 'rgba(74, 222, 128, 0.8)', size: 1, speed: 0.1 },
    ];
    
    const newParticles = Array.from({ length: 80 }).map((_, i) => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      return {
        id: `p-${i}-${Math.random().toString(36).slice(2, 9)}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type.size,
        color: type.color,
        speed: type.speed * (Math.random() * 0.5 + 0.75),
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3,
        connections: []
      };
    });
    
    // Generate connections between nearby particles
    const newConnections = [];
    const connectionDistance = 15;
    
    newParticles.forEach((p1, i) => {
      newParticles.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = 1 - (distance / connectionDistance) * 0.9;
          newConnections.push({
            id: `${p1.id}-${p2.id}`,
            p1: p1.id,
            p2: p2.id,
            opacity: opacity * 0.3,
            distance: distance
          });
          
          p1.connections = [...(p1.connections || []), p2.id];
          p2.connections = [...(p2.connections || []), p1.id];
        }
      });
    });
    
    setParticles(newParticles);
    setConnections(newConnections);
    
    // Animate particles
    let animationFrame;
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(p => {
          let newX = p.x + Math.cos(p.direction) * p.speed * 0.1;
          let newY = p.y + Math.sin(p.direction) * p.speed * 0.1;
          
          // Bounce off edges
          if (newX < 0 || newX > 100) {
            newX = Math.max(0, Math.min(100, newX));
            p.direction = Math.PI - p.direction;
          }
          if (newY < 0 || newY > 100) {
            newY = Math.max(0, Math.min(100, newY));
            p.direction = -p.direction;
          }
          
          // Random direction changes
          if (Math.random() < 0.02) {
            p.direction += (Math.random() - 0.5) * 0.5;
          }
          
          return { ...p, x: newX, y: newY };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            'radial-gradient(circle at 70% 70%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            'radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(conn => {
          const p1 = particles.find(p => p.id === conn.p1);
          const p2 = particles.find(p => p.id === conn.p2);
          
          if (!p1 || !p2) return null;
          
          const isHovered = hoveredParticle && (p1.id === hoveredParticle || p2.id === hoveredParticle);
          const strokeWidth = isHovered ? 0.25 : 0.15;
          const opacity = isHovered ? conn.opacity * 1.5 : conn.opacity * 0.7;
          
          return (
            <line
              key={conn.id}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                opacity: opacity,
                transition: 'all 0.3s ease-out'
              }}
            />
          );
        })}
      </svg>
      
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: hoveredParticle === particle.id ? 1 : particle.opacity,
              boxShadow: hoveredParticle === particle.id 
                ? `0 0 15px 2px ${particle.color}` 
                : `0 0 5px 0 ${particle.color}`,
              transform: hoveredParticle === particle.id ? 'scale(1.5)' : 'scale(1)',
              transition: 'all 0.3s ease-out',
              zIndex: hoveredParticle === particle.id ? 10 : 1,
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredParticle(particle.id)}
            onMouseLeave={() => setHoveredParticle(null)}
            whileHover={{
              scale: 2,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            animate={{
              x: [0, Math.random() * 4 - 2, 0],
              y: [0, Math.random() * 4 - 2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
      
      {/* Interactive cursor effect */}
      <motion.div 
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        style={{
          left: cursorPosition.x - 128,
          top: cursorPosition.y - 128,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%)',
          zIndex: 5
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Animated glow effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
          opacity: 0.7,
          mixBlendMode: 'overlay'
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          background: [
            'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 21 }).map((_, i) => {
            const pos = i * 5;
            const isMajor = i % 5 === 0;
            const opacity = isMajor ? 0.1 : 0.05;
            const strokeWidth = isMajor ? 0.15 : 0.1;
            
            return (
              <React.Fragment key={`grid-${i}`}>
                <line
                  x1={pos}
                  y1="0"
                  x2={pos}
                  y2="100"
                  stroke="white"
                  strokeWidth={strokeWidth}
                  strokeOpacity={opacity}
                />
                <line
                  x1="0"
                  y1={pos}
                  x2="100"
                  y2={pos}
                  stroke="white"
                  strokeWidth={strokeWidth}
                  strokeOpacity={opacity}
                />
              </React.Fragment>
            );
          })}
        </svg>
      </div>
      
      {/* Animated floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"
        style={{
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-10"
        style={{
          filter: 'blur(60px)',
          transform: 'translate(50%, 50%)'
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%'],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 5
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
