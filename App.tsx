import React, { useState, useEffect } from 'react';
import { Layers, Play, Info, RotateCcw } from 'lucide-react';
import { ConditionKey, Initiative } from './types';
import { CONDITIONS, LEVEL_INFO } from './constants';
import PyramidViz from './components/PyramidViz';
import AddInitiativeModal from './components/AddInitiativeModal';
import AnalysisReport from './components/AnalysisReport';

const App: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<ConditionKey | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleAddInitiative = (text: string, isAi = false) => {
    if (selectedCondition) {
      const newInitiative: Initiative = {
        id: Date.now().toString() + Math.random().toString(),
        condition: selectedCondition,
        text,
        isAiGenerated: isAi
      };
      setInitiatives([...initiatives, newInitiative]);
    }
  };

  const handleRemoveInitiative = (id: string) => {
    setInitiatives(initiatives.filter(i => i.id !== id));
  };

  const handleReset = () => {
    if(window.confirm("Clear all initiatives?")) {
        setInitiatives([]);
        setShowReport(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
      
      {/* Left Sidebar / Header on Mobile */}
      <div className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col z-10 shadow-xl">
        <div className="p-6 bg-[#311B92] text-white">
          <h1 className="text-lg font-bold leading-tight">Women's Foundation of Minnesota</h1>
          <p className="text-purple-200 text-xs mt-1 uppercase tracking-widest">Systems Change Mapper</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {showIntro ? (
            <div className="space-y-4 text-slate-600 text-sm">
              <p>
                <strong>Welcome!</strong> This tool helps you map WFM's work against the <em className="text-[#311B92] font-bold">Six Conditions of Systems Change</em>.
              </p>
              <p>
                Real change happens at three levels:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex gap-3">
                   <div className="w-1 h-full bg-[#009688] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#00695C] block text-xs uppercase">Explicit (Structural)</strong>
                     <span className="text-xs text-slate-500">Policies, Practices, Resources. Easy to see, harder to sustain without deeper change.</span>
                   </div>
                </li>
                <li className="flex gap-3">
                   <div className="w-1 h-full bg-[#5E35B1] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#5E35B1] block text-xs uppercase">Semi-Explicit (Relational)</strong>
                     <span className="text-xs text-slate-500">Relationships, Power Dynamics. The connections between people.</span>
                   </div>
                </li>
                <li className="flex gap-3">
                   <div className="w-1 h-full bg-[#311B92] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#311B92] block text-xs uppercase">Implicit (Transformative)</strong>
                     <span className="text-xs text-slate-500">Mental Models. The deepest beliefs holding problems in place.</span>
                   </div>
                </li>
              </ul>
              <button 
                onClick={() => setShowIntro(false)}
                className="w-full mt-4 bg-purple-50 text-[#311B92] py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors border border-purple-100"
              >
                Start Mapping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Total Initiatives</span>
                    <span className="bg-[#009688] text-white text-xs px-2 py-1 rounded-full">{initiatives.length}</span>
                 </div>
                 <p className="text-xs text-slate-500">
                   Click the sections of the inverted pyramid to add initiatives. Fill all levels to unlock the full analysis.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setShowReport(true)}
                    disabled={initiatives.length < 3}
                    className="w-full flex items-center justify-center gap-2 bg-[#00695C] hover:bg-[#004D40] disabled:bg-slate-300 text-white py-3 rounded-lg font-bold shadow-lg transition-all disabled:shadow-none"
                  >
                    <Play className="w-4 h-4" />
                    Analyze Impact
                  </button>
                   <button 
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Map
                  </button>
               </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 text-center">
          <button onClick={() => setShowIntro(true)} className="text-xs text-slate-400 hover:text-[#311B92] flex items-center justify-center gap-1 mx-auto transition-colors">
            <Info className="w-3 h-3" /> About the framework
          </button>
        </div>
      </div>

      {/* Main Viz Area */}
      <div className="flex-1 relative bg-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden">
         <div className="absolute inset-0 wfm-bg opacity-50 pointer-events-none" />
         
         <div className="z-0 w-full h-full flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-light text-slate-800">The Water of Systems Change</h2>
              <p className="text-slate-500 text-sm">Select a section to map WFM activities</p>
            </div>
            
            <div className="w-full max-w-3xl aspect-[4/3] flex items-center justify-center">
               <PyramidViz 
                 initiatives={initiatives}
                 onSelectCondition={setSelectedCondition}
                 selectedCondition={selectedCondition}
               />
            </div>
         </div>
      </div>

      <AddInitiativeModal 
        isOpen={!!selectedCondition}
        onClose={() => setSelectedCondition(null)}
        conditionKey={selectedCondition}
        initiatives={initiatives}
        onAdd={handleAddInitiative}
        onRemove={handleRemoveInitiative}
      />

      {showReport && (
        <AnalysisReport 
          initiatives={initiatives}
          onClose={() => setShowReport(false)}
        />
      )}

    </div>
  );
};

export default App;