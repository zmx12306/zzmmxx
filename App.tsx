import React, { useState, useEffect } from 'react';
import { HOUSES } from './data';
import { AppState, EntryMode } from './types';
import { Layer1_ASRBackground } from './components/Layer1_ASRBackground';
import { Layer2_AISphere } from './components/Layer2_AISphere';
import { Layer3_GuideCard } from './components/Layer3_GuideCard';
import { Layer4_ControlBar } from './components/Layer4_ControlBar';
import { Layer5_Notification } from './components/Layer5_Notification';
import { BottomSheet } from './components/BottomSheet';
import { ReportView } from './components/ReportView';
import { ArrowRight, MessageSquare, Home } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'ENTRY',
    currentHouseId: 'house_1',
    isStreamComplete: false,
    streamStage: 0,
    recordedAnswers: {},
    showSwitchNotification: false,
    showNoteSheet: false,
  });

  const [visitedHouses, setVisitedHouses] = useState<Set<string>>(new Set());

  // Logic: Stream progression simulation
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;

    if (state.view === 'COMPANION' && !state.isStreamComplete) {
        // Reset stage
        setState(s => ({ ...s, streamStage: 0 }));

        // Phase 1: Environment (2s)
        t1 = setTimeout(() => {
            setState(s => ({ ...s, streamStage: 1 }));
        }, 2000);

        // Phase 2: Checklist (4s)
        t2 = setTimeout(() => {
            setState(s => ({ ...s, streamStage: 2, isStreamComplete: true }));
        }, 4000);
    }

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
  }, [state.view, state.currentHouseId]);

  const handleEntry = (mode: EntryMode) => {
    if (mode === 'CHAT') {
        // Simple chat entry simulation
        setState(s => ({ ...s, view: 'COMPANION', currentHouseId: 'house_1' }));
    } else {
        setState(s => ({ ...s, view: 'COMPANION', currentHouseId: 'house_1' }));
    }
    setVisitedHouses(prev => new Set(prev).add('house_1'));
  };

  const triggerHouseSwitch = () => {
    // Determine next house ID
    const nextId = state.currentHouseId === 'house_1' ? 'house_2' : 'house_1';
    
    // If we're already viewing it, don't switch (or toggle notification off)
    if (state.showSwitchNotification) {
        setState(s => ({ ...s, showSwitchNotification: false }));
        return;
    }

    // Show Notification Layer
    setState(s => ({ ...s, showSwitchNotification: true }));
  };

  const confirmSwitch = () => {
    const nextId = state.currentHouseId === 'house_1' ? 'house_2' : 'house_1';
    setState(s => ({ 
        ...s, 
        currentHouseId: nextId, 
        showSwitchNotification: false,
        isStreamComplete: false, // Restart stream
        streamStage: 0
    }));
    setVisitedHouses(prev => new Set(prev).add(nextId));
  };

  const handleStop = () => {
      if (window.confirm("End viewing session and generate report?")) {
          setState(s => ({ ...s, view: 'REPORT_GENERATING' }));
          setTimeout(() => {
              setState(s => ({ ...s, view: 'REPORT' }));
          }, 2000);
      }
  };

  const handleAnswer = (qId: string, ans: string) => {
      setState(s => ({
          ...s,
          recordedAnswers: { ...s.recordedAnswers, [qId]: ans }
      }));
  };

  // --- RENDER ---

  // 1. Entry Screen
  if (state.view === 'ENTRY') {
      return (
        <div className="max-w-md mx-auto h-[100dvh] bg-white flex flex-col justify-center px-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0"/>
             <div className="relative z-10 space-y-8">
                 <div className="text-center space-y-2">
                     <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-blue-200 mb-6">
                         <Home className="text-white" size={40}/>
                     </div>
                     <h1 className="text-3xl font-bold text-gray-900">AI Companion</h1>
                     <p className="text-gray-500">Your intelligent assistant for real estate tours.</p>
                 </div>

                 <div className="space-y-4 pt-8">
                     <button 
                        onClick={() => handleEntry('LISTING')}
                        className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between hover:border-blue-500 transition-colors shadow-sm group"
                     >
                         <div className="text-left">
                             <div className="font-bold text-gray-800">From Listing</div>
                             <div className="text-xs text-gray-400">Grand Tang 2-201</div>
                         </div>
                         <ArrowRight className="text-gray-300 group-hover:text-blue-500"/>
                     </button>

                     <button 
                        onClick={() => handleEntry('CHAT')}
                        className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between hover:border-blue-500 transition-colors shadow-sm group"
                     >
                         <div className="text-left">
                             <div className="font-bold text-gray-800">From Chat</div>
                             <div className="text-xs text-gray-400">"I'm at the property now..."</div>
                         </div>
                         <MessageSquare className="text-gray-300 group-hover:text-blue-500"/>
                     </button>
                 </div>
             </div>
        </div>
      );
  }

  // 3. Report Screen
  if (state.view === 'REPORT_GENERATING') {
      return (
        <div className="max-w-md mx-auto h-[100dvh] bg-white flex flex-col items-center justify-center">
             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 font-medium">Generating Tour Report...</p>
        </div>
      );
  }
  
  if (state.view === 'REPORT') {
      return (
        <div className="max-w-md mx-auto h-[100dvh] relative bg-white">
            <ReportView 
                visitedHouses={Array.from(visitedHouses)} 
                answers={state.recordedAnswers}
                housesData={HOUSES}
                onRestart={() => setState({ ...state, view: 'ENTRY', recordedAnswers: {}, streamStage: 0 })}
            />
        </div>
      )
  }

  // 2. Main Companion View (Layered)
  const currentHouse = HOUSES[state.currentHouseId];
  const nextHouseName = state.currentHouseId === 'house_1' ? HOUSES['house_2'].name : HOUSES['house_1'].name;

  return (
    <div className="max-w-md mx-auto h-[100dvh] relative overflow-hidden bg-gray-50 font-sans select-none">
      
      {/* Layer 1: Background ASR */}
      <Layer1_ASRBackground />

      {/* Layer 2: Visual AI Core */}
      <Layer2_AISphere />

      {/* Layer 3: Main Guide Card */}
      <Layer3_GuideCard 
        house={currentHouse}
        streamStage={state.streamStage}
        recordedAnswers={state.recordedAnswers}
        onAnswer={handleAnswer}
      />

      {/* Layer 4: Control Bar */}
      <Layer4_ControlBar 
        onStop={handleStop}
        onNote={() => setState(s => ({ ...s, showNoteSheet: true }))}
        onSwitch={triggerHouseSwitch}
      />

      {/* Layer 5: Top Notification */}
      <Layer5_Notification 
        visible={state.showSwitchNotification}
        targetHouseName={nextHouseName}
        onConfirm={confirmSwitch}
        onCancel={() => setState(s => ({ ...s, showSwitchNotification: false }))}
      />

      {/* Extras: Bottom Sheet */}
      <BottomSheet 
        isOpen={state.showNoteSheet}
        onClose={() => setState(s => ({ ...s, showNoteSheet: false }))}
      />

      {/* Debug Trigger for Smart Switching (Hidden-ish UI) */}
      <button 
        onClick={triggerHouseSwitch}
        className="absolute top-20 right-4 z-0 opacity-20 text-[10px] bg-black text-white px-2 py-1 rounded"
      >
        [Simulate Intent]
      </button>

    </div>
  );
};

export default App;