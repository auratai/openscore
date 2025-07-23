import { useState, useCallback } from "react";
import { ScoreboardEntry } from "../types";

// Hook for managing leaderboard entries
export { useLeaderboard } from "./useLeaderboard";

// Hook for fetching all leaderboards
export { default as useAllLeaderboards } from "./useAllLeaderboards";

// Hook for managing scoreboard entries
export const useScoreboard = () => {
  const [entries, setEntries] = useState<ScoreboardEntry[]>([]);

  const addEntry = useCallback((entry: Omit<ScoreboardEntry, 'id'>) => {
    const newEntry: ScoreboardEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9)
    };
    setEntries(prev => [...prev, newEntry]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<ScoreboardEntry>) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  }, []);

  return {
    entries,
    addEntry,
    removeEntry,
    updateEntry
  };
}; 