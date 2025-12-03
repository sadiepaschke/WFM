import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Sparkles, Trash2 } from 'lucide-react';
import { ConditionKey, Initiative } from '../types';
import { CONDITIONS } from '../constants';
import { generateSuggestions } from '../services/geminiService';

interface AddInitiativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditionKey: ConditionKey | null;
  initiatives: Initiative[];
  onAdd: (text: string, isAi?: boolean) => void;
  onRemove: (id: string) => void;
}

const AddInitiativeModal: React.FC<AddInitiativeModalProps> = ({ 
  isOpen, onClose, conditionKey, initiatives, onAdd, onRemove 
}) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen || !conditionKey) return null;

  const condition = CONDITIONS[conditionKey];
  const currentInitiatives = initiatives.filter(i => i.condition === conditionKey);

  const handleAdd = () => {
    if (inputText.trim()) {
      onAdd(inputText);
      setInputText('');
    }
  };

  const handleAiSuggest = async () => {
    setIsGenerating(true);
    const suggestions = await generateSuggestions(conditionKey);
    suggestions.forEach(s => onAdd(s, true));
    setIsGenerating(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200 border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: condition.color }}></span>
               <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{condition.level}</p>
            </div>
            <h2 id="modal-title" className="text-2xl font-bold text-slate-900">{condition.label}</h2>
            <p className="text-slate-700 text-sm mt-1 leading-relaxed">{condition.description}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-200 rounded-full transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Body - List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {currentInitiatives.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <p>No initiatives mapped yet.</p>
              <p className="text-sm mt-1">Add one below or ask AI for help.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {currentInitiatives.map((item) => (
                <li key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 shadow-sm group hover:border-slate-300 transition-colors">
                  <div className="flex-1 text-sm text-slate-900 leading-relaxed font-medium">
                    {item.text}
                    {item.isAiGenerated && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-900 border border-purple-200">
                        AI
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all p-1"
                    aria-label={`Remove initiative: ${item.text}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - Input */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <div className="flex gap-2 mb-3">
            <input 
              ref={inputRef}
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="e.g., Grant program for women entrepreneurs..."
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#5E35B1] focus:border-transparent outline-none text-sm text-slate-900 placeholder:text-slate-500"
              aria-label="New initiative text"
            />
            <button 
              onClick={handleAdd}
              disabled={!inputText.trim()}
              className="bg-[#311B92] hover:bg-[#4527A0] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-lg transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-[#311B92]"
              aria-label="Add Initiative"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={handleAiSuggest}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-50 hover:bg-purple-100 text-[#311B92] border border-purple-100 rounded-lg transition-colors text-sm font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            {isGenerating ? (
              <span className="animate-pulse">Consulting Gemini...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Suggest WFM Initiatives with Gemini
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddInitiativeModal;