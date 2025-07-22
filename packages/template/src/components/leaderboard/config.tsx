import { Leaderboard as gamingTemplate } from "./gaming";
import { Leaderboard as compactTemplate } from "./compact";
import { Leaderboard as defaultTemplate } from "./default";

export interface LeaderboardTemplateConfig {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  maxWidth: string;
  visualStyle: 'clean' | 'compact' | 'gaming';
  bestFor: string[];
  features: string[];
  preview?: string;
}

export const LEADERBOARD_TEMPLATES: Record<string, LeaderboardTemplateConfig> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'A clean, professional leaderboard template with balanced spacing and modern design',
    component: defaultTemplate,
    maxWidth: 'max-w-2xl',
    visualStyle: 'clean',
    bestFor: ['Business applications', 'Professional websites', 'General purpose'],
    features: [
      'Clean card-based design',
      'Balanced spacing',
      'Professional color scheme',
      'Responsive layout',
      'Top 3 highlighting'
    ]
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'A space-efficient template that displays more entries in a condensed format',
    component: compactTemplate,
    maxWidth: 'max-w-4xl',
    visualStyle: 'compact',
    bestFor: ['High-traffic leaderboards', 'Mobile-first applications', 'Space-constrained layouts'],
    features: [
      'Space-efficient design',
      'Divided entry layout',
      'Larger max width',
      'Enhanced top 3 styling',
      'Optimized for many entries'
    ]
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    description: 'A vibrant, gaming-themed template with dark colors and glowing effects',
    component: gamingTemplate,
    maxWidth: 'max-w-3xl',
    visualStyle: 'gaming',
    bestFor: ['Gaming applications', 'Esports platforms', 'Youth-oriented content'],
    features: [
      'Dark gaming aesthetic',
      'Gradient backgrounds',
      'Glowing effects',
      'Animated hover states',
      'Gaming-themed styling'
    ]
  }
};

export const getTemplateById = (id: string): LeaderboardTemplateConfig | undefined => {
  return LEADERBOARD_TEMPLATES[id];
};

export const getAllTemplates = (): LeaderboardTemplateConfig[] => {
  return Object.values(LEADERBOARD_TEMPLATES);
};

export const getTemplateIds = (): string[] => {
  return Object.keys(LEADERBOARD_TEMPLATES);
};

export const isValidTemplateId = (id: string): boolean => {
  return id in LEADERBOARD_TEMPLATES;
}; 