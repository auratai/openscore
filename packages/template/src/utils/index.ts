import { cn } from "@openscore/ui";

// Utility function to merge class names
export const mergeClasses = cn;

// Utility function to format scores
export const formatScore = (score: number): string => {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`;
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`;
  }
  return score.toString();
};

// Utility function to get rank suffix
export const getRankSuffix = (rank: number): string => {
  if (rank >= 11 && rank <= 13) return "th";
  switch (rank % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

// Utility function to sort entries by score (descending)
export const sortByScore = <T extends { score: number }>(entries: T[]): T[] => {
  return [...entries].sort((a, b) => b.score - a.score);
};

// Utility function to limit entries
export const limitEntries = <T>(entries: T[], maxEntries?: number): T[] => {
  if (!maxEntries) return entries;
  return entries.slice(0, maxEntries);
};

// Utility function to format column values based on type
export const formatColumnValue = (value: any, columnType: string): string => {
  if (value === null || value === undefined) return '-';
  
  switch (columnType) {
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : String(value);
    case 'date':
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString();
      }
      return String(value);
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'text':
    default:
      return String(value);
  }
};

// Utility function to get column display name
export const getColumnDisplayName = (column: { name: string; displayName?: string }): string => {
  return column.displayName || column.name.charAt(0).toUpperCase() + column.name.slice(1);
}; 