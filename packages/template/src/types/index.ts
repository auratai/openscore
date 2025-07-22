// Common types for all templates
export interface BaseTemplateProps {
  className?: string;
  children?: React.ReactNode;
}

// Leaderboard specific types
export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  metadata?: Record<string, any>;
}

export interface LeaderboardTemplateProps extends BaseTemplateProps {
  entries: LeaderboardEntry[];
  title?: string;
  maxEntries?: number;
  showRank?: boolean;
  showScore?: boolean;
  showAvatar?: boolean;
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