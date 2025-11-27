import React from 'react';
import { Camera, Keyboard, Mic, X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div className="bg-white rounded-t-3xl p-6 relative z-10 animate-slide-up shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Add Note</h3>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                <X size={20} className="text-gray-600"/>
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Camera size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">Photo</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    <Keyboard size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">Text</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <Mic size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">Audio</span>
            </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};
