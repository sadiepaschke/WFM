import { ConditionKey, Level, ConditionDef } from './types';

// WFM Branding Palette - WCAG Compliant
// Colors adjusted to ensure at least 4.5:1 contrast ratio with white text.

export const CONDITIONS: Record<ConditionKey, ConditionDef> = {
  [ConditionKey.POLICIES]: {
    key: ConditionKey.POLICIES,
    label: 'Policies',
    description: 'Government, institutional and organizational rules, regulations, and priorities.',
    level: Level.EXPLICIT,
    color: '#00838F', // Darker Cyan (Accessible Teal)
    gridArea: 'policies',
  },
  [ConditionKey.PRACTICES]: {
    key: ConditionKey.PRACTICES,
    label: 'Practices',
    description: 'Espoused activities of institutions, coalitions, and networks.',
    level: Level.EXPLICIT,
    color: '#00796B', // Darker Teal
    gridArea: 'practices',
  },
  [ConditionKey.RESOURCE_FLOWS]: {
    key: ConditionKey.RESOURCE_FLOWS,
    label: 'Resource Flows',
    description: 'How money, people, knowledge, and information are allocated.',
    level: Level.EXPLICIT,
    color: '#004D40', // Deepest Teal
    gridArea: 'resources',
  },
  [ConditionKey.RELATIONSHIPS]: {
    key: ConditionKey.RELATIONSHIPS,
    label: 'Relationships',
    description: 'Quality of connections and communication occurring among actors.',
    level: Level.SEMI_EXPLICIT,
    color: '#673AB7', // Deep Purple 500 (Accessible)
    gridArea: 'relationships',
  },
  [ConditionKey.POWER_DYNAMICS]: {
    key: ConditionKey.POWER_DYNAMICS,
    label: 'Power Dynamics',
    description: 'The distribution of decision-making power, authority, and influence.',
    level: Level.SEMI_EXPLICIT,
    color: '#512DA8', // Deep Purple 700
    gridArea: 'power',
  },
  [ConditionKey.MENTAL_MODELS]: {
    key: ConditionKey.MENTAL_MODELS,
    label: 'Mental Models',
    description: 'Habits of thought, deeply held beliefs, and assumptions.',
    level: Level.IMPLICIT,
    color: '#311B92', // Deep Purple 900
    gridArea: 'mental',
  },
};

export const LEVEL_INFO = {
  [Level.EXPLICIT]: {
    title: 'Structural Change (Explicit)',
    description: 'Tangible, visible changes. Necessary but often not sufficient for long-term impact.',
    color: 'text-teal-800' // Darkened for contrast
  },
  [Level.SEMI_EXPLICIT]: {
    title: 'Relational Change (Semi-Explicit)',
    description: 'Shifting how people relate and share power. Bridges the gap between structure and mindset.',
    color: 'text-purple-800' // Darkened for contrast
  },
  [Level.IMPLICIT]: {
    title: 'Transformative Change (Implicit)',
    description: 'The deepest level. Shifting the "water" we swim in—our fundamental beliefs.',
    color: 'text-purple-950' // Darkened for contrast
  }
};