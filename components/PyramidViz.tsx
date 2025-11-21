import React from 'react';
import { ConditionKey, Initiative } from '../types';
import { CONDITIONS } from '../constants';

interface PyramidVizProps {
  initiatives: Initiative[];
  onSelectCondition: (key: ConditionKey) => void;
  selectedCondition: ConditionKey | null;
}

const PyramidViz: React.FC<PyramidVizProps> = ({ initiatives, onSelectCondition, selectedCondition }) => {
  
  const getCount = (key: ConditionKey) => initiatives.filter(i => i.condition === key).length;

  // Interactive SVG Paths for an inverted pyramid divided into 3 levels.
  // Row 1 (Top): Policies (Left), Practices (Center), Resource Flows (Right)
  // Row 2 (Mid): Relationships (Left), Power Dynamics (Right)
  // Row 3 (Bot): Mental Models (Center)

  const renderSection = (key: ConditionKey, pathD: string, cx: number, cy: number) => {
    const def = CONDITIONS[key];
    const count = getCount(key);
    const isSelected = selectedCondition === key;
    
    return (
      <g 
        key={key} 
        onClick={() => onSelectCondition(key)} 
        className="cursor-pointer transition-all duration-300 hover:brightness-110 group"
      >
        <path 
          d={pathD} 
          fill={def.color} 
          fillOpacity={count > 0 ? 1 : 0.7}
          stroke="white" 
          strokeWidth={isSelected ? 4 : 1}
          className="transition-all duration-300"
          style={{ filter: isSelected ? 'drop-shadow(0 0 10px rgba(126, 87, 194, 0.6))' : 'none' }}
        />
        <text 
          x={cx} 
          y={cy} 
          textAnchor="middle" 
          className="text-[10px] uppercase font-bold fill-white pointer-events-none tracking-wider"
        >
          {def.label}
        </text>
        {count > 0 && (
          <circle cx={cx} cy={cy + 15} r={8} fill="white" className="opacity-90" />
        )}
        {count > 0 && (
          <text x={cx} y={cy + 18} textAnchor="middle" className="text-[10px] font-bold fill-[#311B92] pointer-events-none">
            {count}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
       {/* Background Decoration - Subtle WFM Purple Blur */}
       <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#7E57C2] blur-3xl"></div>
       </div>

      <svg viewBox="0 0 400 360" className="w-full max-w-xl drop-shadow-2xl filter">
        <defs>
          {/* WFM Gradient: From Teal (Surface) to Deep Purple (Implicit) */}
          <linearGradient id="wfmGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#26C6DA" /> {/* Bright Teal */}
            <stop offset="100%" stopColor="#311B92" /> {/* Deep Purple */}
          </linearGradient>
        </defs>
        
        {/* Explicit Level (Top Row) */}
        {renderSection(ConditionKey.POLICIES, "M 0 0 L 133 0 L 155 100 L 55 100 Z", 85, 50)}
        {renderSection(ConditionKey.PRACTICES, "M 136 0 L 264 0 L 245 100 L 158 100 Z", 200, 50)}
        {renderSection(ConditionKey.RESOURCE_FLOWS, "M 267 0 L 400 0 L 345 100 L 248 100 Z", 315, 50)}

        {/* Semi-Explicit Level (Middle Row) */}
        {renderSection(ConditionKey.RELATIONSHIPS, "M 58 103 L 198 103 L 198 220 L 118 220 Z", 138, 160)}
        {renderSection(ConditionKey.POWER_DYNAMICS, "M 202 103 L 342 103 L 282 220 L 202 220 Z", 262, 160)}

        {/* Implicit Level (Bottom Row) */}
        {renderSection(ConditionKey.MENTAL_MODELS, "M 120 223 L 280 223 L 200 360 Z", 200, 280)}
        
      </svg>
    </div>
  );
};

export default PyramidViz;