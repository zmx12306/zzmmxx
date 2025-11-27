import React from 'react';
import { HouseData } from '../types';
import { FileText, Check, Home } from 'lucide-react';

interface ReportViewProps {
    visitedHouses: string[];
    answers: Record<string, string>;
    housesData: Record<string, HouseData>;
    onRestart: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ visitedHouses, answers, housesData, onRestart }) => {
    return (
        <div className="h-full bg-gray-50 overflow-y-auto pb-20 pt-12 px-6">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Tour Summary</h1>
                <p className="text-gray-500">You visited {visitedHouses.length} properties today.</p>
            </div>

            <div className="space-y-6">
                {visitedHouses.map(id => {
                    const house = housesData[id];
                    return (
                        <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Home size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{house.name}</h3>
                                    <p className="text-xs text-gray-500">{house.price}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Observations</h4>
                                <div className="space-y-2">
                                    {house.checklist.map(item => {
                                        const answer = answers[item.id];
                                        if(!answer) return null;
                                        return (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">{item.label}</span>
                                                <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                                    {answer}
                                                </span>
                                            </div>
                                        )
                                    })}
                                    {Object.keys(answers).filter(k => house.checklist.some(c => c.id === k)).length === 0 && (
                                        <p className="text-sm text-gray-400 italic">No checklist items recorded.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button 
                onClick={onRestart}
                className="mt-8 w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
                Start New Tour
            </button>
        </div>
    )
}
