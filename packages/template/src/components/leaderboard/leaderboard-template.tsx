import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";
import { Avatar } from "../common/avatar";
import { ScoreDisplay } from "../common/score-display";
import { RankBadge } from "../common/rank-badge";
import type { LeaderboardTemplateProps, LeaderboardEntry } from "../../types";
import { sortByScore, limitEntries, mergeClasses } from "../../utils";

export const LeaderboardTemplate: React.FC<LeaderboardTemplateProps> = ({
  entries,
  title = "Leaderboard",
  maxEntries,
  showRank = true,
  showScore = true,
  showAvatar = true,
  className
}) => {
  const sortedEntries = sortByScore(entries);
  const limitedEntries = limitEntries(sortedEntries, maxEntries);

  return (
    <Card className={mergeClasses("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {limitedEntries.map((entry, index) => (
            <LeaderboardEntry
              key={entry.id}
              entry={entry}
              index={index}
              showRank={showRank}
              showScore={showScore}
              showAvatar={showAvatar}
            />
          ))}
          {limitedEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No entries yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface LeaderboardEntryProps {
  entry: LeaderboardEntry;
  index: number;
  showRank: boolean;
  showScore: boolean;
  showAvatar: boolean;
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  entry,
  index,
  showRank,
  showScore,
  showAvatar
}) => {
  const isTopThree = index < 3;
  
  return (
    <div className={mergeClasses(
      "flex items-center gap-4 p-3 rounded-lg transition-colors",
      isTopThree ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200" : "hover:bg-gray-50"
    )}>
      {showRank && (
        <div className="flex-shrink-0">
          <RankBadge rank={entry.rank} size="sm" />
        </div>
      )}
      
      {showAvatar && (
        <div className="flex-shrink-0">
          <Avatar
            src={entry.avatar}
            alt={entry.name}
            size="sm"
            fallback={entry.name.charAt(0)}
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className={mergeClasses(
          "font-medium truncate",
          isTopThree ? "text-blue-900" : "text-gray-900"
        )}>
          {entry.name}
        </h3>
      </div>
      
      {showScore && (
        <div className="flex-shrink-0">
          <ScoreDisplay
            score={entry.score}
            size="sm"
            variant={isTopThree ? "highlight" : "default"}
          />
        </div>
      )}
    </div>
  );
}; 