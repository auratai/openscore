import { useState, useEffect, useCallback } from "react";
import type { LeaderboardEntry } from "../types";

interface LeaderboardData {
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
  entries: any[];
}

interface UseLeaderboardOptions {
  leaderboardId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseLeaderboardReturn {
  data: LeaderboardData | null;
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addEntry: (entry: Omit<LeaderboardEntry, 'id' | 'rank'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<LeaderboardEntry>) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
}

const useLeaderboard = (options: UseLeaderboardOptions = {}): UseLeaderboardReturn => {
  const { leaderboardId, autoRefresh = false, refreshInterval = 30000 } = options;
  
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    if (!leaderboardId) {
      setError("Leaderboard ID is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/leaderboards/${leaderboardId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Leaderboard not found");
        }
        throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
      }

      const leaderboardData: LeaderboardData = await response.json();
      setData(leaderboardData);

      // Transform entries to match LeaderboardEntry interface
      const transformedEntries: LeaderboardEntry[] = leaderboardData.entries.map((entry: any, index: number) => ({
        id: entry.id || `entry-${index}`,
        rank: entry.rank || index + 1,
        name: entry.name || entry.playerName || "Unknown Player",
        score: entry.score || entry.data?.score || 0,
        avatar: entry.avatar || entry.data?.avatar,
        metadata: entry.data || entry.metadata || {}
      }));

      setEntries(transformedEntries);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, [leaderboardId]);

  const addEntry = useCallback(async (entry: Omit<LeaderboardEntry, 'id' | 'rank'>) => {
    if (!leaderboardId) {
      throw new Error("Leaderboard ID is required");
    }

    try {
      const response = await fetch(`/api/leaderboards/${leaderboardId}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error(`Failed to add entry: ${response.statusText}`);
      }

      // Refresh the leaderboard data
      await fetchLeaderboard();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  }, [leaderboardId, fetchLeaderboard]);

  const updateEntry = useCallback(async (id: string, updates: Partial<LeaderboardEntry>) => {
    if (!leaderboardId) {
      throw new Error("Leaderboard ID is required");
    }

    try {
      const response = await fetch(`/api/leaderboards/${leaderboardId}/entries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update entry: ${response.statusText}`);
      }

      // Refresh the leaderboard data
      await fetchLeaderboard();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  }, [leaderboardId, fetchLeaderboard]);

  const removeEntry = useCallback(async (id: string) => {
    if (!leaderboardId) {
      throw new Error("Leaderboard ID is required");
    }

    try {
      const response = await fetch(`/api/leaderboards/${leaderboardId}/entries/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove entry: ${response.statusText}`);
      }

      // Refresh the leaderboard data
      await fetchLeaderboard();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  }, [leaderboardId, fetchLeaderboard]);

  // Initial fetch
  useEffect(() => {
    if (leaderboardId) {
      fetchLeaderboard();
    }
  }, [leaderboardId, fetchLeaderboard]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh || !leaderboardId) return;

    const interval = setInterval(fetchLeaderboard, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, leaderboardId, refreshInterval, fetchLeaderboard]);

  return {
    data,
    entries,
    loading,
    error,
    refresh: fetchLeaderboard,
    addEntry,
    updateEntry,
    removeEntry,
  };
};

export { useLeaderboard };