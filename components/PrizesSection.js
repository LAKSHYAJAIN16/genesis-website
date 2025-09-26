'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrophyCube from './TrophyCube';
function TrophyModel() {
  const group = useRef();
  const { scrollYProgress } = useScroll({
    target: { current: document.getElementById('prizes-section') },
    offset: ['start start', 'end end']
  });

  // Calculate rotation based on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotation.get();
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4cc9f0" />
      <mesh castShadow>
        <torusKnotGeometry args={[1, 0.3, 200, 32]} />
        <meshPhysicalMaterial 
          color="#ffd700"
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
}

function PrizeDescription() {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="max-w-2xl p-8 bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-lg rounded-2xl border border-gold-400/30 shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h2 className="text-5xl font-serif font-light text-gold-400 mb-6 tracking-wider">Prizes</h2>
        <div className="space-y-6 text-gray-200">
          <p className="text-xl leading-relaxed font-light">
            Compete for prestigious awards and valuable prizes in our hackathon. 
            Showcase your skills and creativity for a chance to win amazing rewards 
            and recognition from industry leaders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {[
              { title: '1st Place', prize: '$5,000', desc: 'Grand Prize' },
              { title: '2nd Place', prize: '$3,000', desc: 'Runner Up' },
              { title: 'Best Design', prize: '$2,000', desc: 'Most Innovative UI/UX' },
              { title: 'Audience Choice', prize: '$1,500', desc: 'Community Favorite' },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-black/40 rounded-lg border border-gold-400/20 hover:border-gold-400/50 transition-colors">
                <div className="text-gold-400 text-2xl font-medium">{item.title}</div>
                <div className="text-3xl font-bold text-white my-2">{item.prize}</div>
                <div className="text-gray-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PrizesSection() {
  return (
    <section id="prizes-section" className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <style jsx global>{`
        canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black/90" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <TrophyModel />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4PSIxIiB5PSIxIiByeD0iMSIvPjwvZz48L2c+PC9zdmc+')" />
      </div>
      
      <PrizeDescription />
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold-400 flex flex-col items-center z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <span className="text-sm mb-2">Scroll to rotate</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}
