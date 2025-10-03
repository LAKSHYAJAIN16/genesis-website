'use client';

import { useEffect, useRef } from 'react';

const BuildingsBackground = ({ width = 800, height = 500 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Gradient for sky
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0c4a6e');  // Dark blue at top
    gradient.addColorStop(1, '#1e3a8a');  // Darker blue at bottom
    
    // Draw sky
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * (height * 0.5); // Only in top half
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Building colors
    const buildingColors = [
      '#1e3a8a', '#1e40af', '#1e4ed8', '#1d4ed8', '#1e40af',
      '#1e3a8a', '#1e40af', '#1e4ed8', '#1d4ed8', '#1e40af'
    ];

    // Draw buildings
    const buildingCount = 12;
    const minBuildingWidth = width / 10;
    const maxBuildingWidth = width / 6;
    
    let x = 0;
    while (x < width) {
      const buildingWidth = Math.random() * (maxBuildingWidth - minBuildingWidth) + minBuildingWidth;
      const buildingHeight = Math.random() * (height * 0.6) + (height * 0.3);
      const y = height - buildingHeight;
      
      // Draw building
      ctx.fillStyle = buildingColors[Math.floor(Math.random() * buildingColors.length)];
      ctx.fillRect(x, y, buildingWidth, buildingHeight);
      
      // Add windows
      const windowSize = Math.min(8, buildingWidth * 0.2);
      const windowSpacing = windowSize * 1.5;
      const windowsPerRow = Math.max(2, Math.floor((buildingWidth * 0.8) / windowSpacing));
      const rows = Math.floor((buildingHeight * 0.8) / windowSpacing);
      
      // Random window colors (some lit, some dark)
      const windowColors = ['#fef08a', '#fde047', '#facc15', '#1e3a8a', '#1e40af'];
      
      for (let row = 0; row < rows; row++) {
        for (let win = 0; win < windowsPerRow; win++) {
          const windowX = x + (buildingWidth * 0.1) + (win * windowSpacing);
          const windowY = y + (buildingHeight * 0.1) + (row * windowSpacing);
          
          // Randomly choose if window is lit
          if (Math.random() > 0.4) { // 60% chance of being lit
            ctx.fillStyle = windowColors[Math.floor(Math.random() * 2)]; // Only use yellow colors for lit windows
            ctx.fillRect(windowX, windowY, windowSize, windowSize);
            
            // Add glow effect for lit windows
            ctx.shadowColor = '#fef08a';
            ctx.shadowBlur = 5;
            ctx.fillRect(windowX, windowY, windowSize, windowSize);
            ctx.shadowBlur = 0;
          } else {
            // Dark windows
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(windowX, windowY, windowSize, windowSize);
          }
        }
      }
      
      x += buildingWidth + 2; // Small gap between buildings
    }
  }, [width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-50"
      width={width}
      height={height}
    />
  );
};

export default BuildingsBackground;
