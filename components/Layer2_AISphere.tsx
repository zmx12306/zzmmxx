import React from 'react';

export const Layer2_AISphere: React.FC = () => {
  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
      {/* Core Sphere */}
      <div className="relative">
        {/* Outer Glow */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 opacity-40 blur-2xl animate-pulse-slow absolute inset-0"></div>
        
        {/* Inner Sphere */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center animate-float relative z-10 overflow-hidden">
             {/* Liquid/Aurora effect simulation */}
            <div className="absolute inset-0 bg-white opacity-20 animate-spin-slow rounded-[40%] scale-150 origin-center translate-y-2"></div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">AI Listening</span>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
        .animate-float { animation: float 6s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
};
