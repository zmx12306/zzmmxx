import React from 'react';
import { Square, Pause, PenLine, ArrowRightLeft } from 'lucide-react';

interface ControlBarProps {
  onStop: () => void;
  onNote: () => void;
  onSwitch: () => void;
}

export const Layer4_ControlBar: React.FC<ControlBarProps> = ({ onStop, onNote, onSwitch }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-8 pt-4 px-6 flex items-center justify-between">
      
      {/* Left: Recording Controls */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onStop}
          className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 active:scale-90 transition-transform"
        >
          <Square fill="currentColor" size={20} />
        </button>
        <button className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-90 transition-transform">
          <Pause fill="currentColor" size={20} />
        </button>
      </div>

      {/* Middle: Note Button */}
      <button 
        onClick={onNote}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 transform -translate-y-4 active:scale-95 transition-transform"
      >
        <PenLine size={28} />
      </button>

      {/* Right: Switch House */}
      <button 
        onClick={onSwitch}
        className="h-12 px-5 bg-gray-900 rounded-full flex items-center space-x-2 text-white shadow-lg active:scale-95 transition-transform"
      >
        <span className="text-sm font-semibold">Next</span>
        <ArrowRightLeft size={16} />
      </button>
    </div>
  );
};
