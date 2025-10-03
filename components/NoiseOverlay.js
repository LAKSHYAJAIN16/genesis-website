'use client';

import { useEffect, useRef } from 'react';

export default function NoiseOverlay({ opacity = 0.03, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    let animationFrameId;
    
    // Set canvas size to match parent
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
    };

    // Generate noise pattern
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Generate random grayscale value (0-255)
        const value = Math.floor(Math.random() * 255);
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // A (opacity controlled by CSS)
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    // Animation loop
    const animate = () => {
      frameCount++;
      
      // Only update the noise every few frames for better performance
      if (frameCount % 2 === 0) {
        generateNoise();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    generateNoise();
    animate();

    // Handle window resize
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-[var(--noise-opacity,0.03)] ${className}`}
      style={{ '--noise-opacity': opacity }}
      aria-hidden="true"
    />
  );
}
