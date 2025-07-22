import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";
import { Avatar } from "../../common/avatar";
import { ScoreDisplay } from "../../common/score-display";
import { RankBadge } from "../../common/rank-badge";
import type { LeaderboardTemplateProps, LeaderboardEntry } from "../../../types";
import { sortByScore, limitEntries, mergeClasses } from "../../../utils";

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({
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
    <Card className={mergeClasses("w-full max-w-4xl", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
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
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-lg">No entries yet</p>
              <p className="text-sm">Be the first to join!</p>
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
  const isFirst = index === 0;
  
  const getBackgroundColor = () => {
    if (isFirst) return "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400";
    if (index === 1) return "bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400";
    if (index === 2) return "bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400";
    return "hover:bg-gray-50 border-l-4 border-transparent";
  };
  
  return (
    <div className={mergeClasses(
      "flex items-center gap-6 p-6 transition-all duration-200",
      getBackgroundColor()
    )}>
      {showRank && (
        <div className="flex-shrink-0">
          <RankBadge 
            rank={entry.rank} 
            size={isTopThree ? "lg" : "md"}
            variant={isTopThree ? "default" : "default"}
          />
        </div>
      )}
      
      <div className="flex items-center gap-4 flex-1">
        {showAvatar && (
          <div className="flex-shrink-0">
            <Avatar
              src={entry.avatar}
              alt={entry.name}
              size={isTopThree ? "lg" : "md"}
              fallback={entry.name.charAt(0)}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={mergeClasses(
            "font-semibold truncate",
            isFirst ? "text-yellow-900 text-lg" : 
            index === 1 ? "text-gray-900 text-lg" :
            index === 2 ? "text-orange-900 text-lg" : "text-gray-900"
          )}>
            {entry.name}
          </h3>
          {entry.metadata?.team && (
            <p className="text-sm text-gray-500 truncate">{entry.metadata.team}</p>
          )}
        </div>
      </div>
      
      {showScore && (
        <div className="flex-shrink-0 text-right">
          <ScoreDisplay
            score={entry.score}
            size={isTopThree ? "lg" : "md"}
            variant={isTopThree ? "highlight" : "default"}
          />
          {entry.metadata?.level && (
            <p className="text-xs text-gray-500 mt-1">Level {entry.metadata.level}</p>
          )}
        </div>
      )}
    </div>
  );
}; 