import React, { useEffect, useState, useRef } from 'react';
import { MOCK_TRANSCRIPT } from '../data';

export const Layer1_ASRBackground: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate incoming speech to text
    let index = 0;
    const interval = setInterval(() => {
      setLines(prev => {
        const newLine = MOCK_TRANSCRIPT[index % MOCK_TRANSCRIPT.length];
        index++;
        return [...prev.slice(-10), newLine]; // Keep last 10 lines
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [lines]);

  return (
    <div className="absolute inset-0 z-0 bg-gray-50 overflow-hidden pointer-events-none">
      <div 
        ref={scrollRef}
        className="h-full w-full flex flex-col justify-end pb-48 px-6 space-y-4 opacity-30 overflow-hidden mask-gradient-top"
      >
        {lines.map((line, i) => (
          <p 
            key={i} 
            className={`text-xl font-medium text-black transition-all duration-500 ${
              i === lines.length - 1 ? 'opacity-100 scale-105 origin-left' : 'opacity-60'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
      {/* CSS Mask for fading out top */}
      <style>{`
        .mask-gradient-top {
          mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
        }
      `}</style>
    </div>
  );
};
