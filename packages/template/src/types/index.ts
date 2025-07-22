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
  columns: any[];
  sortByColumn?: string;
  entries: LeaderboardEntry[];
  maxEntries?: number;
  showRank?: boolean;
  showScore?: boolean;
  showAvatar?: boolean;
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