import React from 'react';
import { HouseData } from '../types';
import { Sun, Volume2, Wind, Thermometer, CheckCircle2, Circle } from 'lucide-react';

interface GuideCardProps {
  house: HouseData;
  streamStage: number;
  recordedAnswers: Record<string, string>;
  onAnswer: (questionId: string, answer: string) => void;
}

const TagIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const icons: Record<string, any> = { sun: Sun, 'volume-2': Volume2, wind: Wind, thermometer: Thermometer };
  const Icon = icons[name] || Sun;
  return <Icon className={className} size={18} />;
};

export const Layer3_GuideCard: React.FC<GuideCardProps> = ({ 
  house, 
  streamStage, 
  recordedAnswers,
  onAnswer 
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[65%] z-20 bg-white rounded-t-[32px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-500">
      {/* Handle Bar */}
      <div className="w-full flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="px-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">{house.name}</h2>
        <p className="text-sm text-gray-500 mt-1 truncate">{house.address}</p>
        <div className="flex items-center mt-2 space-x-2">
           <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">Verified</span>
           <span className="text-sm font-bold text-blue-600">{house.price}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Stage 0: Skeleton / Loading */}
        {streamStage === 0 && (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="h-20 bg-gray-100 rounded-xl"></div>
              <div className="h-20 bg-gray-100 rounded-xl"></div>
              <div className="h-20 bg-gray-100 rounded-xl"></div>
            </div>
            <div className="mt-6 space-y-3">
                 <div className="h-24 bg-gray-100 rounded-xl"></div>
                 <div className="h-24 bg-gray-100 rounded-xl"></div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-8 italic">AI is aggregating house data...</p>
          </div>
        )}

        {/* Stage 1: Environment Analysis */}
        {streamStage >= 1 && (
          <div className="animate-fade-in-up">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Environment Analysis</h3>
            <div className="grid grid-cols-3 gap-3">
              {house.tags.map((tag, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center space-y-2 border border-gray-100">
                  <TagIcon name={tag.icon} className={tag.color} />
                  <span className="text-xs text-gray-500 font-medium">{tag.label}</span>
                  <span className="text-sm font-bold text-gray-800">{tag.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2: Checklist */}
        {streamStage >= 2 && (
          <div className="animate-fade-in-up delay-100 pb-24">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2">Deep Inspection Checklist</h3>
            <div className="space-y-4">
              {house.checklist.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-semibold text-gray-800">{item.label}</span>
                    {recordedAnswers[item.id] && (
                       <CheckCircle2 size={16} className="text-green-500" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {item.options.map((option) => {
                      const isSelected = recordedAnswers[item.id] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => onAnswer(item.id, option)}
                          className={`flex-1 py-2 px-1 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-gray-300 mt-6">End of checklist</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};
