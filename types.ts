export enum ConditionKey {
  POLICIES = 'POLICIES',
  PRACTICES = 'PRACTICES',
  RESOURCE_FLOWS = 'RESOURCE_FLOWS',
  RELATIONSHIPS = 'RELATIONSHIPS',
  POWER_DYNAMICS = 'POWER_DYNAMICS',
  MENTAL_MODELS = 'MENTAL_MODELS'
}

export enum Level {
  EXPLICIT = 'Explicit',
  SEMI_EXPLICIT = 'Semi-Explicit',
  IMPLICIT = 'Implicit'
}

export interface ConditionDef {
  key: ConditionKey;
  label: string;
  description: string;
  level: Level;
  color: string;
  gridArea: string; // For CSS Grid layout or SVG positioning logic
}

export interface Initiative {
  id: string;
  condition: ConditionKey;
  text: string;
  isAiGenerated?: boolean;
}

export interface AnalysisResult {
  score: number;
  level: string; // "Surface Swimmer", "Deep Diver", "System Changer"
  gapAnalysis: string;
  recommendations: string[];
}
