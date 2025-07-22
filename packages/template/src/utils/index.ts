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