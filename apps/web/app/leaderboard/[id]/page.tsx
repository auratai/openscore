"use client";

import { useLeaderboard, LeaderboardTemplateSelector, LEADERBOARD_TEMPLATES, getAllTemplates } from "@openscore/template";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LeaderboardPage() {
  const params = useParams();
  const leaderboardId = params.id as string;
  
  // State for template type selection
  const [selectedTemplateType, setSelectedTemplateType] = useState<keyof typeof LEADERBOARD_TEMPLATES>('default');

  const {
    data,
    entries,
    loading,
    error
  } = useLeaderboard({
    leaderboardId: leaderboardId || undefined,
    autoRefresh: true,
    refreshInterval: 30000 // Refresh every 30 seconds
  });

  // Update selected template type when data changes
  useEffect(() => {
    if (data?.templateType) {
      const templateType = data.templateType.toLowerCase();
      if (templateType.includes('gaming')) {
        setSelectedTemplateType('gaming');
      } else if (templateType.includes('compact')) {
        setSelectedTemplateType('compact');
      } else {
        setSelectedTemplateType('default');
      }
    }
  }, [data?.templateType]);
  

  // Handle missing leaderboard ID
  if (!leaderboardId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Leaderboard Not Found</h1>
          <p className="text-muted-foreground mb-4">No leaderboard ID provided in the URL.</p>
          <p className="text-sm text-muted-foreground">
            Please provide a valid leaderboard ID in the URL: /leaderboard/YOUR_ID
          </p>
        </div>
      </div>
    );
  }

  const availableTemplates = getAllTemplates();

  // Prepare data object with configuration properties
  const leaderboardData = data ? {
    ...data,
    entries: entries || [],
    maxEntries: 50,
    showRank: true,
    showScore: true,
    showAvatar: true
  } : null;

  return (
    <div className="min-h-screen bg-background py-8">

        {/* Template Type Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-card rounded-lg shadow-sm border p-4">
            <label htmlFor="template-select" className="block text-sm font-medium text-foreground mb-2">
              Template Style
            </label>
            <select
              id="template-select"
              value={selectedTemplateType}
              onChange={(e) => setSelectedTemplateType(e.target.value as keyof typeof LEADERBOARD_TEMPLATES)}
              className="block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring sm:text-sm bg-background text-foreground"
            >
              {availableTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            {/* Template description */}
            <div className="mt-2 text-xs text-muted-foreground max-w-xs">
              {LEADERBOARD_TEMPLATES[selectedTemplateType]?.description}
            </div>
          </div>
        </div>

        {/* Leaderboard Content */}
        <div className="flex justify-center">
          <LeaderboardTemplateSelector
            data={leaderboardData}
            loading={loading}
            error={error}
            templateType={selectedTemplateType}
          />
        </div>

    </div>
  );
}