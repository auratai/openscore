import { useState, useCallback } from "react";
import { LeaderboardEntry, ScoreboardEntry } from "../types";

// Hook for managing leaderboard entries
export * from "./useLeaderboard";

// Hook for fetching all leaderboards
export { default as useAllLeaderboards } from "./useAllLeaderboards";

// Hook for managing scoreboard entries
export const useScoreboard = (initialEntries: ScoreboardEntry[] = []) => {
  const [entries, setEntries] = useState<ScoreboardEntry[]>(initialEntries);

  const addEntry = useCallback((entry: ScoreboardEntry) => {
    setEntries(prev => [...prev, entry]);
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<ScoreboardEntry>) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  return {
    entries,
    addEntry,
    updateEntry,
    removeEntry,
    setEntries
  };
}; 