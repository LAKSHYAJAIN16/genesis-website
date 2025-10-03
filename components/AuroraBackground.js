'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Simple 2D noise function for smooth movement
function createNoise() {
  const p = new Array(512);
  const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  
  for (let i = 0; i < 256; i++) {
    p[256 + i] = p[i] = permutation[i];
  }

  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t, a, b) => a + t * (b - a);
  const grad = (hash, x, y) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    const u = fade(x);
    const v = fade(y);
    
    const A = p[X] + Y, AA = p[A], AB = p[A + 1];
    const B = p[X + 1] + Y, BA = p[B], BB = p[B + 1];
    
    return lerp(v, lerp(u, 
      grad(p[AA], x, y), 
      grad(p[BA], x - 1, y)
    ), lerp(u, 
      grad(p[AB], x, y - 1), 
      grad(p[BB], x - 1, y - 1)
    ));
  };
}

export default function AuroraBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef();
  const blobs = useRef([]);
  const noise = useRef(createNoise());
  const time = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const noiseOffsets = useRef([]);

  // Initialize blobs with random positions, sizes, and colors
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      
      // Reset blobs on resize
      initBlobs(rect.width, rect.height);
    };

    // Initialize blobs with random positions and properties
    const initBlobs = (width, height) => {
      blobs.current = Array(5).fill().map((_, i) => {
        const isPrimary = i % 3 === 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isPrimary ? 300 + Math.random() * 200 : 150 + Math.random() * 200,
          baseRadius: 0, // Will be set based on type
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          noiseX: Math.random() * 1000,
          noiseY: Math.random() * 1000,
          noiseSpeed: 0.1 + Math.random() * 0.2,
          noiseScale: 0.002 + Math.random() * 0.003,
          color: [
            isPrimary ? 50 + Math.random() * 50 : 0,
            isPrimary ? 100 + Math.random() * 50 : 50 + Math.random() * 30,
            isPrimary ? 200 + Math.random() * 55 : 150 + Math.random() * 50,
          ],
          targetColor: [0, 0, 0],
          colorSpeed: 0.001 + Math.random() * 0.002,
          alpha: 0.3 + Math.random() * 0.3,
          pulseSpeed: 0.0005 + Math.random() * 0.001,
          pulseAmount: 0.1 + Math.random() * 0.2,
          timeOffset: Math.random() * 1000,
        };
      });

      // Set initial target colors
      blobs.current.forEach(blob => {
        updateTargetColor(blob);
      });
    };

    // Update a blob's target color
    const updateTargetColor = (blob) => {
      const isPrimary = Math.random() > 0.5;
      blob.targetColor = [
        isPrimary ? 50 + Math.random() * 50 : 0,
        isPrimary ? 100 + Math.random() * 50 : 50 + Math.random() * 30,
        isPrimary ? 200 + Math.random() * 55 : 150 + Math.random() * 50,
      ];
    };

    // Update blob positions and properties
    const updateBlobs = (width, height, deltaTime) => {
      time.current += deltaTime;
      
      blobs.current.forEach((blob, i) => {
        // Update position with noise-based movement
        const noiseX = noise.current(blob.noiseX, blob.noiseY);
        const noiseY = noise.current(blob.noiseY, blob.noiseX);
        
        blob.x += (noiseX * 2 - 1) * blob.noiseSpeed * 10;
        blob.y += (noiseY * 2 - 1) * blob.noiseSpeed * 10;
        
        blob.noiseX += blob.noiseScale;
        blob.noiseY += blob.noiseScale;

        // Smooth color transition
        for (let c = 0; c < 3; c++) {
          blob.color[c] += (blob.targetColor[c] - blob.color[c]) * blob.colorSpeed * deltaTime;
          
          // If close to target, set new target
          if (Math.abs(blob.color[c] - blob.targetColor[c]) < 1) {
            updateTargetColor(blob);
          }
        }

        // Pulsing effect
        const pulse = Math.sin(time.current * blob.pulseSpeed + blob.timeOffset) * blob.pulseAmount + 1;
        blob.radius = blob.baseRadius * pulse;

        // Keep within bounds with soft wrapping
        if (blob.x < -blob.radius * 0.5) blob.x = width + blob.radius * 0.5;
        if (blob.x > width + blob.radius * 0.5) blob.x = -blob.radius * 0.5;
        if (blob.y < -blob.radius * 0.5) blob.y = height + blob.radius * 0.5;
        if (blob.y > height + blob.radius * 0.5) blob.y = -blob.radius * 0.5;
      });
    };

    // Draw blobs with improved rendering
    const drawBlobs = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Clear with a slight fade for motion blur effect
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Set blend mode for the blobs
      ctx.globalCompositeOperation = 'screen';
      
      // Draw each blob
      blobs.current.forEach(blob => {
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        
        const [r, g, b] = blob.color.map(c => Math.round(c));
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Apply blur if supported
      if (ctx.filter !== undefined) {
        ctx.filter = 'blur(80px)';
        // Draw again with blur for better effect
        blobs.current.forEach(blob => {
          const [r, g, b] = blob.color.map(c => Math.round(c));
          const gradient = ctx.createRadialGradient(
            blob.x, blob.y, 0,
            blob.x, blob.y, blob.radius * 0.7
          );
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha * 0.7})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.radius * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
        ctx.filter = 'none';
      }
    };

    // Animation loop with delta time
    let lastTime = 0;
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = Math.min(100, currentTime - lastTime); // Cap delta time
      lastTime = currentTime;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      updateBlobs(width, height, deltaTime);
      drawBlobs();
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    animationFrameId.current = requestAnimationFrame(animate);

    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId.current);
      resizeCanvas();
      animationFrameId.current = requestAnimationFrame(animate);
    });
    resizeObserver.observe(canvas.parentElement);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
    };
  }, []);

  // Make sure the component is mounted before starting animation
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isVisible ? 0.9 : 0,
          transition: 'opacity 1s ease-in-out',
          mixBlendMode: 'screen',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
