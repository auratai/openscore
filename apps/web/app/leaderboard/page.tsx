"use client";

import { useAllLeaderboards } from "@openscore/template";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";

export default function LeaderboardPage() {
  const { leaderboards, loading, error, refresh } = useAllLeaderboards();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Error Loading Leaderboards</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">All Leaderboards</h1>
          <p className="text-lg text-muted-foreground">
            Browse and explore all available leaderboards
          </p>
        </div>

        {/* Leaderboards Grid */}
        {leaderboards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Leaderboards Found</h2>
            <p className="text-muted-foreground">There are no leaderboards available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaderboards.map((leaderboard) => (
              <Link 
                key={leaderboard.id} 
                href={`/leaderboard/${leaderboard.viewId}`}
                className="block group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 group-hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {leaderboard.title}
                    </CardTitle>
                    {leaderboard.subheading && (
                      <p className="text-sm text-muted-foreground">{leaderboard.subheading}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {leaderboard.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {leaderboard.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {leaderboard.templateType || 'default'}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
                          {leaderboard.entryCount} entries
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground/60">
                        {new Date(leaderboard.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {leaderboard.startDate && (
                      <div className="mt-3 text-xs text-muted-foreground">
                        <span className="font-medium">Active:</span> {new Date(leaderboard.startDate).toLocaleDateString()}
                        {leaderboard.endDate && ` - ${new Date(leaderboard.endDate).toLocaleDateString()}`}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={refresh}
            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Refresh Leaderboards
          </button>
        </div>
      </div>
    </div>
  );
}