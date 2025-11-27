import React from 'react';
import { MapPin } from 'lucide-react';

interface NotificationProps {
  visible: boolean;
  targetHouseName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Layer5_Notification: React.FC<NotificationProps> = ({ 
  visible, 
  targetHouseName, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div 
      className={`absolute top-4 left-4 right-4 z-40 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-md text-white rounded-full p-2 pr-6 shadow-2xl flex items-center justify-between w-full max-w-sm mx-auto border border-gray-700">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
            <MapPin size={18} className="text-blue-400" />
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Intent Detected</span>
             <span className="text-sm font-semibold truncate">Switch to {targetHouseName}?</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
            <button 
              onClick={onCancel}
              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-800"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 h-8 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-bold transition-colors"
            >
              Yes
            </button>
        </div>
      </div>
    </div>
  );
};
