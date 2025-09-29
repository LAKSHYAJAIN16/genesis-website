'use client';

import { useEffect, useRef } from 'react';

const SmoothBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Configuration
  const config = {
    particleCount: 60, // Reduced number of particles
    particleSize: 1.5,
    baseOpacity: 0.3,
    activeOpacity: 0.7,
    lineDistance: 120,
    lineWidth: 0.5,
    colors: [
      'rgba(99, 102, 241, 0.3)',  // indigo-500
      'rgba(79, 70, 229, 0.3)',   // indigo-600
      'rgba(67, 56, 202, 0.3)',   // indigo-700
    ],
    speed: 0.02,  // Slower movement
    directionChange: 0.01,  // Slower direction changes
  };

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = config.particleSize * (0.5 + Math.random() * 0.5);
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.speed = config.speed * (0.5 + Math.random());
      this.direction = Math.random() * Math.PI * 2;
      this.opacity = config.baseOpacity;
    }

    update(mouseX, mouseY) {
      // Move in current direction
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      // Random direction changes
      if (Math.random() < 0.01) {
        this.direction += (Math.random() - 0.5) * config.directionChange;
      }

      // Wrap around edges
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;

      // Mouse interaction
      if (mouseX && mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Move away from mouse
          this.direction = Math.atan2(this.y - mouseY, this.x - mouseX);
          this.opacity = config.activeOpacity;
          return;
        }
      }
      
      this.opacity = config.baseOpacity;
    }

    draw() {
      this.ctx.fillStyle = this.color.replace('0.3', this.opacity);
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles
    const initParticles = () => {
      return Array.from({ length: config.particleCount }, () => new Particle(canvas));
    };

    particles.current = initParticles();

    // Draw connections between particles
    const drawConnections = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.lineDistance) {
            const opacity = 1 - (distance / config.lineDistance) * 0.8;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx.lineWidth = config.lineWidth;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        particle.update(mousePosition.current.x, mousePosition.current.y);
        particle.draw();
      });
      
      // Draw connections
      drawConnections();
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800"
      />
    </div>
  );
};

export default SmoothBackground;
