import React, { useState } from 'react';
import { Play, Info, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { ConditionKey, Initiative } from './types';
import PyramidViz from './components/PyramidViz';
import AddInitiativeModal from './components/AddInitiativeModal';
import AnalysisReport from './components/AnalysisReport';

const App: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<ConditionKey | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    <div className="h-dvh w-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
      
      {/* Sidebar / Header */}
      <div 
        className={`
          w-full md:w-96 bg-white border-r border-slate-200 flex flex-col z-10 shadow-xl transition-all duration-300
          ${isSidebarCollapsed ? 'h-auto' : 'h-auto md:h-full'}
        `}
      >
        <div className="p-4 md:p-6 bg-[#311B92] text-white flex justify-between items-center">
          <div>
             <h1 className="text-base md:text-lg font-bold leading-tight">Women's Foundation of Minnesota</h1>
             <p className="text-purple-200 text-[10px] md:text-xs mt-1 uppercase tracking-widest">Systems Change Mapper</p>
          </div>
          {/* Mobile Collapse Button */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="md:hidden text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1"
            aria-label={isSidebarCollapsed ? "Expand header" : "Collapse header"}
          >
            {isSidebarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
        
        {/* Sidebar Content - Hidden on mobile if collapsed */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-6 ${isSidebarCollapsed ? 'hidden md:block' : 'block'}`}>
          {showIntro ? (
            <div className="space-y-4 text-slate-700 text-sm animate-in fade-in slide-in-from-top-4">
              <p tabIndex={0}>
                <strong>Welcome!</strong> This tool maps WFM's work against the <em className="text-[#311B92] font-bold not-italic">Six Conditions of Systems Change</em>.
              </p>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200">
                <div className="flex gap-3">
                   <div className="w-2 h-2 mt-1 bg-[#00796B] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#004D40] block text-xs uppercase">Explicit (Structural)</strong>
                     <span className="text-xs text-slate-600">Policies, Practices, Resources. Visible but hard to sustain alone.</span>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-2 h-2 mt-1 bg-[#512DA8] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#512DA8] block text-xs uppercase">Semi-Explicit (Relational)</strong>
                     <span className="text-xs text-slate-600">Relationships, Power Dynamics. Shifting connections.</span>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-2 h-2 mt-1 bg-[#311B92] rounded-full shrink-0"></div>
                   <div>
                     <strong className="text-[#311B92] block text-xs uppercase">Implicit (Transformative)</strong>
                     <span className="text-xs text-slate-600">Mental Models. Deep beliefs holding problems in place.</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => { setShowIntro(false); if(window.innerWidth < 768) setIsSidebarCollapsed(true); }}
                className="w-full mt-4 bg-purple-50 text-[#311B92] py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                Start Mapping
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
               <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Total Initiatives</span>
                    <span className="bg-[#00796B] text-white text-xs px-2 py-1 rounded-full font-bold">{initiatives.length}</span>
                 </div>
                 <p className="text-xs text-slate-600">
                   Tap the sections of the inverted pyramid to add initiatives. 
                 </p>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => setShowReport(true)}
                    disabled={initiatives.length < 3}
                    className="w-full flex items-center justify-center gap-2 bg-[#004D40] hover:bg-[#00332a] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold shadow-md transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[#004D40] focus:outline-none"
                    aria-label="Analyze Impact Report"
                  >
                    <Play className="w-4 h-4" />
                    Analyze Impact
                  </button>
                   <button 
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition-all focus:ring-2 focus:ring-slate-400 focus:outline-none"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Map
                  </button>
               </div>
            </div>
          )}
        </div>

        {/* Footer links */}
        <div className={`p-4 border-t border-slate-200 text-center space-y-2 ${isSidebarCollapsed ? 'hidden md:block' : 'block'}`}>
          <button
            onClick={() => setShowIntro(true)}
            className="text-xs text-slate-500 hover:text-[#311B92] flex items-center justify-center gap-1 mx-auto transition-colors focus:outline-none focus:underline"
          >
            <Info className="w-3 h-3" /> About the framework
          </button>
          <div className="flex flex-col gap-1 text-xs">
            <a
              href="https://anthralytic.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#311B92] transition-colors focus:outline-none focus:underline"
            >
              Anthralytic Substack
            </a>
            <a
              href="https://www.anthralytic.ai/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#311B92] transition-colors focus:outline-none focus:underline"
            >
              Free Anthralytic AI Tools
            </a>
          </div>
        </div>
      </div>

      {/* Main Viz Area */}
      <div className="flex-1 relative bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 wfm-bg opacity-30 pointer-events-none" />
         
         <div className="z-0 w-full h-full flex flex-col items-center justify-center p-2 md:p-8">
            {/* Mobile instructions only show when space permits */}
            <div className="mb-4 md:mb-8 text-center shrink-0">
              <h2 className="text-xl md:text-2xl font-light text-slate-800">The Water of Systems Change</h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">Select a section to map WFM activities</p>
            </div>
            
            <div className="w-full max-w-3xl flex-1 flex items-center justify-center min-h-0">
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