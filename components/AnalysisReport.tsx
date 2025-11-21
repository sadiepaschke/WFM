import React, { useEffect, useState } from 'react';
import { Initiative, AnalysisResult } from '../types';
import { analyzeSystemsMap } from '../services/geminiService';
import { Loader2, RefreshCw, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CONDITIONS, LEVEL_INFO } from '../constants';

interface AnalysisReportProps {
  initiatives: Initiative[];
  onClose: () => void;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ initiatives, onClose }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const data = await analyzeSystemsMap(initiatives);
      setResult(data);
      setLoading(false);
    };
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const getChartData = () => {
    return Object.values(CONDITIONS).map(c => ({
      name: c.label,
      count: initiatives.filter(i => i.condition === c.key).length,
      color: c.color
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
         <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-purple-700 mx-auto" />
            <h2 className="text-xl font-semibold text-slate-800">Analyzing Systems Impact...</h2>
            <p className="text-slate-500">Gemini is evaluating your map against the Six Conditions framework.</p>
         </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Systems Change Report</h1>
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium transition-colors">
            Back to Map
          </button>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Readiness Level</p>
            <h2 className="text-4xl font-bold text-purple-900 mb-2">{result.level}</h2>
            <p className="text-slate-600">{result.gapAnalysis}</p>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                <circle 
                  cx="64" cy="64" r="60" 
                  stroke="#7e22ce" strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={377} 
                  strokeDashoffset={377 - (377 * result.score) / 100}
                  className="transition-all duration-1000 ease-out"
                />
             </svg>
             <div className="absolute text-center">
                <span className="text-2xl font-bold text-slate-900">{result.score}</span>
                <span className="text-xs block text-slate-500">/ 100</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Distribution Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Effort Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                  <XAxis dataKey="name" hide />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {getChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
               <span>Explicit</span>
               <span>Semi-Explicit</span>
               <span>Implicit</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Strategic Recommendations
             </h3>
             <ul className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="mt-1 bg-purple-100 text-purple-800 rounded-full p-1 shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 text-sm">{rec}</p>
                  </li>
                ))}
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisReport;