// Common types for all templates
export interface BaseTemplateProps {
  className?: string;
  children?: React.ReactNode;
}

// Leaderboard specific types
export interface LeaderboardEntry {
  id: string;
  [key: string]: any; // Allow any properties for flexible column support
}

export interface LeaderboardColumn {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  sortable?: boolean;
  required?: boolean;
  displayName?: string;
}

export interface LeaderboardData {
  id: string;
  viewId: string;
  editId: string;
  title: string;
  subheading?: string;
  description?: string;
  url?: string;
  note?: string;
  templateType?: string;
  startDate?: string;
  endDate?: string;
  columns: LeaderboardColumn[];
  sortByColumn?: string;
  entries: LeaderboardEntry[];
}

export interface LeaderboardTemplateProps extends BaseTemplateProps {
  data: LeaderboardData;
}

// Scoreboard specific types
export interface ScoreboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  metadata?: Record<string, any>;
}

export interface ScoreboardTemplateProps extends BaseTemplateProps {
  entries: ScoreboardEntry[];
  title?: string;
  maxEntries?: number;
  showScore?: boolean;
  showAvatar?: boolean;
} 