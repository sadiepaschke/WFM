import { ConditionKey, Level, ConditionDef } from './types';

// WFM Branding Palette Approximation
// Teal/Green for Explicit/Structural
// Purple for Implicit/Deep

export const CONDITIONS: Record<ConditionKey, ConditionDef> = {
  [ConditionKey.POLICIES]: {
    key: ConditionKey.POLICIES,
    label: 'Policies',
    description: 'Government, institutional and organizational rules, regulations, and priorities.',
    level: Level.EXPLICIT,
    color: '#26C6DA', // WFM Bright Teal/Cyan
    gridArea: 'policies',
  },
  [ConditionKey.PRACTICES]: {
    key: ConditionKey.PRACTICES,
    label: 'Practices',
    description: 'Espoused activities of institutions, coalitions, and networks.',
    level: Level.EXPLICIT,
    color: '#009688', // WFM Teal
    gridArea: 'practices',
  },
  [ConditionKey.RESOURCE_FLOWS]: {
    key: ConditionKey.RESOURCE_FLOWS,
    label: 'Resource Flows',
    description: 'How money, people, knowledge, and information are allocated.',
    level: Level.EXPLICIT,
    color: '#00695C', // WFM Dark Teal
    gridArea: 'resources',
  },
  [ConditionKey.RELATIONSHIPS]: {
    key: ConditionKey.RELATIONSHIPS,
    label: 'Relationships',
    description: 'Quality of connections and communication occurring among actors.',
    level: Level.SEMI_EXPLICIT,
    color: '#7E57C2', // WFM Lighter Purple
    gridArea: 'relationships',
  },
  [ConditionKey.POWER_DYNAMICS]: {
    key: ConditionKey.POWER_DYNAMICS,
    label: 'Power Dynamics',
    description: 'The distribution of decision-making power, authority, and influence.',
    level: Level.SEMI_EXPLICIT,
    color: '#5E35B1', // WFM Medium Purple
    gridArea: 'power',
  },
  [ConditionKey.MENTAL_MODELS]: {
    key: ConditionKey.MENTAL_MODELS,
    label: 'Mental Models',
    description: 'Habits of thought, deeply held beliefs, and assumptions.',
    level: Level.IMPLICIT,
    color: '#311B92', // WFM Deep Purple
    gridArea: 'mental',
  },
};

export const LEVEL_INFO = {
  [Level.EXPLICIT]: {
    title: 'Structural Change (Explicit)',
    description: 'Tangible, visible changes. Necessary but often not sufficient for long-term impact.',
    color: 'text-teal-700'
  },
  [Level.SEMI_EXPLICIT]: {
    title: 'Relational Change (Semi-Explicit)',
    description: 'Shifting how people relate and share power. Bridges the gap between structure and mindset.',
    color: 'text-purple-600'
  },
  [Level.IMPLICIT]: {
    title: 'Transformative Change (Implicit)',
    description: 'The deepest level. Shifting the "water" we swim in—our fundamental beliefs.',
    color: 'text-purple-900'
  }
};