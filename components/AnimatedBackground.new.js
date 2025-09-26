'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const touchPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const particles = useRef([]);
  const layers = useRef([]);

  // Enhanced configuration
  const config = {
    // Base particles
    particleCount: 200,
    particleSize: 1.5,
    particleBaseOpacity: 0.4,
    particleActiveOpacity: 0.9,
    
    // Connections
    lineBaseOpacity: 0.05,
    lineActiveOpacity: 0.5,
    lineDistance: 120,
    lineMaxWidth: 1.5,
    connectionDistance: 150,
    maxConnections: 6,
    
    // Movement
    baseMoveSpeed: 0.15,
    mouseInfluence: 0.2,
    touchInfluence: 0.4,
    
    // Colors
    colors: [
      { base: '#6366f1', highlight: '#818cf8' }, // Indigo
      { base: '#8b5cf6', highlight: '#a78bfa' }, // Purple
      { base: '#ec4899', highlight: '#f472b6' }, // Pink
      { base: '#3b82f6', highlight: '#60a5fa' }, // Blue
      { base: '#10b981', highlight: '#34d399' }  // Emerald
    ],
    
    // Layers (3D effect)
    layers: 3,
    layerDistance: 50,
    
    // Effects
    enablePulse: true,
    pulseSpeed: 0.5,
    enableRotation: true,
    rotationSpeed: 0.0005,
    enableOrbit: true,
    orbitRadius: 200,
    orbitSpeed: 0.0003
  };

  // Initialize particles with 3D positions
  const initParticles = (width, height) => {
    particles.current = [];
    layers.current = [];
    
    // Create multiple layers for 3D effect
    for (let l = 0; l < config.layers; l++) {
      const layerParticles = [];
      const layerZ = (l / (config.layers - 1)) * 2 - 1; // -1 to 1 range
      const scale = 0.5 + (1 - Math.abs(layerZ)) * 0.5; // Scale based on Z position
      
      const particlesInLayer = Math.floor(config.particleCount / config.layers);
      
      for (let i = 0; i < particlesInLayer; i++) {
        // Position in 3D space
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = (Math.random() - 0.5) * config.layerDistance * 2;
        
        // Random properties
        const colorIndex = Math.floor(Math.random() * config.colors.length);
        const size = config.particleSize * (0.7 + Math.random() * 0.6);
        const speed = config.baseMoveSpeed * (0.5 + Math.random() * 0.5);
        const angle = Math.random() * Math.PI * 2;
        
        layerParticles.push({
          x, y, z,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          colorIndex,
          baseX: x,
          baseY: y,
          baseZ: z,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitRadius: config.orbitRadius * (0.5 + Math.random() * 0.5),
          orbitSpeed: (Math.random() - 0.5) * config.orbitSpeed * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }
      
      layers.current.push({
        z: layerZ,
        scale,
        particles: layerParticles
      });
      
      particles.current = particles.current.concat(layerParticles);
    }
  };

  // Project 3D position to 2D
  const project = (x, y, z, width, height) => {
    const scale = 1 / (1 + z / 1000);
    return {
      x: x * scale + width / 2 * (1 - scale),
      y: y * scale + height / 2 * (1 - scale),
      scale
    };
  };

  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;
    let time = 0;
    
    // Set initial canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Initialize particles
    initParticles(width, height);

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
      canvas.width = width;
      canvas.height = height;
      initParticles(width, height);
    };

    // Handle mouse and touch events
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        touchPosition.current = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      }
    };

    // Update particle positions and connections
    const updateParticles = (deltaTime) => {
      time += deltaTime * 0.001; // Convert to seconds
      
      // Update each layer
      layers.current.forEach((layer, layerIndex) => {
        const layerTime = time * (1 + layerIndex * 0.2); // Slight time offset per layer
        
        // Update particles in this layer
        layer.particles.forEach(particle => {
          // Apply base movement
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Apply orbit effect
          if (config.enableOrbit) {
            particle.orbitAngle += particle.orbitSpeed * deltaTime;
            const orbitX = Math.cos(particle.orbitAngle) * particle.orbitRadius;
            const orbitY = Math.sin(particle.orbitAngle) * particle.orbitRadius * 0.5;
            particle.x = particle.baseX + orbitX;
            particle.y = particle.baseY + orbitY;
          }
          
          // Apply rotation
          if (config.enableRotation) {
            particle.rotation += particle.rotationSpeed * deltaTime;
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            particle.x = centerX + Math.cos(particle.rotation) * dx - Math.sin(particle.rotation) * dy;
            particle.y = centerY + Math.sin(particle.rotation) * dx + Math.cos(particle.rotation) * dy;
          }
          
          // Apply pulse effect
          if (config.enablePulse) {
            particle.pulsePhase += config.pulseSpeed * 0.01;
            const pulse = 0.8 + Math.sin(particle.pulsePhase) * 0.2;
            particle.currentSize = particle.size * pulse;
          } else {
            particle.currentSize = particle.size;
          }
          
          // Bounce off walls with damping
          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -0.9;
            particle.x = Math.max(0, Math.min(width, particle.x));
          }
          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -0.9;
            particle.y = Math.max(0, Math.min(height, particle.y));
          }
          
          // Reset connections for this frame
          particle.connections = [];
        });
      });
      
      // Update connections between particles
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          
          // Calculate distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if particles should connect
          if (distance < config.connectionDistance && 
              p1.connections.length < config.maxConnections && 
              p2.connections.length < config.maxConnections) {
            
            // Calculate connection strength based on distance
            const strength = 1 - (distance / config.connectionDistance);
            
            // Store connection
            p1.connections.push({
              target: p2,
              strength: strength
            });
            
            p2.connections.push({
              target: p1,
              strength: strength
            });
          }
        }
      }
    };
    
    // Draw particles and connections
    const draw = () => {
      // Clear canvas with a subtle gradient
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections first (behind particles)
      ctx.lineWidth = config.lineMaxWidth;
      
      particles.current.forEach(particle => {
        const pos1 = project(particle.x, particle.y, particle.z, width, height);
        
        particle.connections.forEach(connection => {
          const particle2 = connection.target;
          const pos2 = project(particle2.x, particle2.y, particle2.z, width, height);
          
          // Skip if either particle is off-screen
          if (!pos1 || !pos2) return;
          
          // Calculate line properties based on connection strength and distance
          const strength = connection.strength;
          const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y);
          const color1 = config.colors[particle.colorIndex].base;
          const color2 = config.colors[particle2.colorIndex].base;
          
          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);
          
          // Draw connection line with glow effect
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = config.lineBaseOpacity + 
                           (config.lineActiveOpacity - config.lineBaseOpacity) * strength;
          ctx.lineWidth = config.lineMaxWidth * strength * pos1.scale * 0.5;
          
          // Draw curved line for more organic feel
          const midX = (pos1.x + pos2.x) / 2;
          const midY = (pos1.y + pos2.y) / 2;
          const cpx = midX + (Math.random() - 0.5) * 20 * (1 - strength);
          const cpy = midY + (Math.random() - 0.5) * 20 * (1 - strength);
          
          ctx.moveTo(pos1.x, pos1.y);
          ctx.quadraticCurveTo(cpx, cpy, pos2.x, pos2.y);
          ctx.stroke();
        });
      });
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      // Draw particles on top
      particles.current.forEach(particle => {
        const pos = project(particle.x, particle.y, particle.z, width, height);
        if (!pos) return;
        
        // Calculate distance to mouse/touch for interactive effects
        let distanceToMouse = Infinity;
        let distanceToTouch = Infinity;
        
        if (mousePosition.current) {
          const dx = pos.x - mousePosition.current.x;
          const dy = pos.y - mousePosition.current.y;
          distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        }
        
        if (touchPosition.current) {
          const dx = pos.x - touchPosition.current.x;
          const dy = pos.y - touchPosition.current.y;
          distanceToTouch = Math.sqrt(dx * dx + dy * dy);
        }
        
        // Calculate particle properties
        const mouseInfluence = Math.min(1, Math.max(0, 1 - distanceToMouse / 200)) * config.mouseInfluence;
        const touchInfluence = Math.min(1, Math.max(0, 1 - distanceToTouch / 200)) * config.touchInfluence;
        const influence = Math.max(mouseInfluence, touchInfluence);
        
        // Draw particle with glow effect
        const size = particle.currentSize * pos.scale * (1 + influence * 0.5);
        const color = config.colors[particle.colorIndex];
        const highlight = influence > 0.1;
        
        // Outer glow
        if (highlight) {
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, size * 2
          );
          gradient.addColorStop(0, color.highlight + '80');
          gradient.addColorStop(1, color.base + '00');
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(pos.x, pos.y, size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Particle
        ctx.beginPath();
        ctx.fillStyle = highlight ? color.highlight : color.base;
        ctx.globalAlpha = config.particleBaseOpacity + 
                         (config.particleActiveOpacity - config.particleBaseOpacity) * influence;
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };
    
    // Main animation loop
    let lastTime = 0;
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Update and draw
      updateParticles(deltaTime);
      draw();
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden w-screen h-screen">
      <canvas 
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
