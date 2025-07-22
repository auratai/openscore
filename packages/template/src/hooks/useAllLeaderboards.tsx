import { useState, useEffect, useCallback } from "react";

interface LeaderboardSummary {
  id: string;
  viewId: string;
  editId: string;
  title: string;
  subheading?: string;
  description?: string;
  templateType?: string;
  startDate?: string;
  endDate?: string;
  entryCount: number;
  createdAt: string;
  updatedAt: string;
}

interface UseAllLeaderboardsReturn {
  leaderboards: LeaderboardSummary[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const useAllLeaderboards = (): UseAllLeaderboardsReturn => {
  const [leaderboards, setLeaderboards] = useState<LeaderboardSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboards = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leaderboards');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboards: ${response.statusText}`);
      }

      const data: LeaderboardSummary[] = await response.json();
      setLeaderboards(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching leaderboards:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchLeaderboards();
  }, [fetchLeaderboards]);

  return {
    leaderboards,
    loading,
    error,
    refresh: fetchLeaderboards,
  };
};

export default useAllLeaderboards; 