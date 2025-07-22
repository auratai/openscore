import * as React from "react";
import { LEADERBOARD_TEMPLATES, getTemplateById, type LeaderboardTemplateConfig } from "./config";
import type { LeaderboardTemplateProps, LeaderboardData } from "../../types";

interface LeaderboardTemplateSelectorProps {
  data: LeaderboardData | null;
  loading?: boolean;
  error?: string | null;
  templateType?: keyof typeof LEADERBOARD_TEMPLATES;
  className?: string;
  children?: React.ReactNode;
}

export const LeaderboardTemplateSelector: React.FC<LeaderboardTemplateSelectorProps> = ({
  data,
  loading = false,
  error = null,
  templateType = 'default',
  className,
  children
}) => {
  // Handle loading state
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 text-center">
        <div className="text-red-500 mb-4">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Leaderboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Handle no data state
  if (!data) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 text-center">
        <div className="text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <h2 className="text-xl font-bold mb-2">No Leaderboard Data</h2>
          <p>Unable to load leaderboard information.</p>
        </div>
      </div>
    );
  }

  // Get the template configuration
  const templateConfig = getTemplateById(templateType);
  
  if (!templateConfig) {
    console.warn(`Template type "${templateType}" not found, falling back to default`);
    const defaultConfig = getTemplateById('default');
    if (!defaultConfig) {
      throw new Error('Default template not found');
    }
    return React.createElement(defaultConfig.component, {
      data,
      className
    });
  }

  // Pass the whole data object to the template
  const templateProps = {
    data,
    className
  };

  // Render the template using the configuration
  return React.createElement(templateConfig.component, templateProps);
}; 