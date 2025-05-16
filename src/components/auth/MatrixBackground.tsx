
import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Characters to display
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789".split("");
    
    // Array to track the y position of each column
    const drops: number[] = [];
    // Initialize all columns to start at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * -1;
    }

    // Drawing function
    const draw = () => {
      // Translucent background to show trail
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Text settings
      context.fillStyle = '#0fa0ce'; // Bright blue color
      context.font = `${fontSize}px monospace`;
      
      // Draw each character
      for (let i = 0; i < columns; i++) {
        // Pick a random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate x and y positions
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Draw the character
        context.fillText(char, x, y);
        
        // Move the drop down
        drops[i]++;
        
        // Reset when off the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recalculate columns
      const newColumns = Math.floor(canvas.width / fontSize);
      
      // Adjust drops array
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = 0;
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default MatrixBackground;
