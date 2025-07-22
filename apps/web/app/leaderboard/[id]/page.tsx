"use client";

import { useLeaderboard, LeaderboardTemplateSelector } from "@openscore/template";
import { useSearchParams, useParams } from "next/navigation";

export default function LeaderboardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const leaderboardId = params.id as string;
  const name = searchParams.get('name');

  const {
    data,
    entries,
    loading,
    error,
    refresh,
    addEntry,
    updateEntry,
    removeEntry
  } = useLeaderboard({
    leaderboardId: leaderboardId || undefined,
    autoRefresh: true,
    refreshInterval: 30000 // Refresh every 30 seconds
  });

  // Handle missing leaderboard ID
  if (!leaderboardId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard Not Found</h1>
          <p className="text-gray-600 mb-4">No leaderboard ID provided in the URL.</p>
          <p className="text-sm text-gray-500">
            Please provide a valid leaderboard ID in the URL: /leaderboard/YOUR_ID
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data?.title || name || "Leaderboard"}
          </h1>
          {data?.subheading && (
            <p className="text-lg text-gray-600 mb-4">{data.subheading}</p>
          )}
          {data?.description && (
            <p className="text-gray-500 max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>

        {/* Leaderboard Content */}
        <div className="flex justify-center">
          <LeaderboardTemplateSelector
            data={data}
            loading={loading}
            error={error}
            entries={entries}
            maxEntries={50}
            showRank={true}
            showScore={true}
            showAvatar={true}
            fallbackTemplate="default"
          />
        </div>

        {/* Additional Info */}
        {data && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Leaderboard ID: {data.viewId}</p>
            {data.note && <p className="mt-2 italic">"{data.note}"</p>}
            {data.startDate && (
              <p className="mt-1">
                Active from {new Date(data.startDate).toLocaleDateString()}
                {data.endDate && ` to ${new Date(data.endDate).toLocaleDateString()}`}
              </p>
            )}
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p>Loading: {loading.toString()}</p>
            <p>Error: {error || 'None'}</p>
            <p>Entries Count: {entries.length}</p>
            <p>Template Type: {data?.templateType || 'default'}</p>
            <button 
              onClick={refresh}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}