import { useState, useEffect, useCallback } from "react";
import type { LeaderboardEntry, LeaderboardData } from "../types";

interface UseLeaderboardOptions {
  leaderboardId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseLeaderboardReturn {
  data: LeaderboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addEntry: (entry: Omit<LeaderboardEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<LeaderboardEntry>) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
}

const useLeaderboard = (options: UseLeaderboardOptions = {}): UseLeaderboardReturn => {
  const { leaderboardId, autoRefresh = false, refreshInterval = 30000 } = options;
  
  const [data, setData] = useState<LeaderboardData | null>(null);
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
      
      // Add rank column by default if it doesn't exist
      const hasRankColumn = leaderboardData.columns.some(col => col.name === 'rank');
      if (!hasRankColumn) {
        leaderboardData.columns.unshift({
          name: 'rank',
          type: 'number',
          sortable: false,
          required: true,
          displayName: 'Rank'
        });
      }

      // Sort entries by the specified column and add rank
      if (leaderboardData.sortByColumn && leaderboardData.entries.length > 0) {
        const sortColumn = leaderboardData.sortByColumn;
        
        // Sort entries by the specified column (descending for numbers, ascending for text)
        leaderboardData.entries.sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
          
          // Handle different data types
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return bValue - aValue; // Descending for numbers
          }
          
          if (aValue instanceof Date && bValue instanceof Date) {
            return bValue.getTime() - aValue.getTime(); // Descending for dates
          }
          
          // For strings and other types, convert to string and compare
          const aStr = String(aValue || '');
          const bStr = String(bValue || '');
          return aStr.localeCompare(bStr); // Ascending for strings
        });

        // Add rank to each entry
        leaderboardData.entries.forEach((entry, index) => {
          entry.rank = index + 1;
        });
      }

      setData(leaderboardData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, [leaderboardId]);

  const addEntry = useCallback(async (entry: Omit<LeaderboardEntry, 'id'>) => {
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
    loading,
    error,
    refresh: fetchLeaderboard,
    addEntry,
    updateEntry,
    removeEntry,
  };
};

export { useLeaderboard };