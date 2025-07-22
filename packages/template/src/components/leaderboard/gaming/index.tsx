import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";
import { Avatar } from "../../common/avatar";
import { ScoreDisplay } from "../../common/score-display";
import { RankBadge } from "../../common/rank-badge";
import type { LeaderboardTemplateProps, LeaderboardEntry } from "../../../types";
import { sortByScore, limitEntries, mergeClasses } from "../../../utils";

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({
  data,
  className
}) => {
  const { entries = [], title = "Leaderboard", maxEntries, showRank = true, showScore = true, showAvatar = true } = data;
  
  const sortedEntries = sortByScore(entries);
  const limitedEntries = limitEntries(sortedEntries, maxEntries);

  return (
    <Card className={mergeClasses("w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-purple-500 shadow-2xl", className)}>
      <CardHeader className="pb-6 border-b border-purple-500/30">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
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
            <div className="text-center py-16 text-purple-300">
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-xl font-bold mb-2">No Players Yet</p>
              <p className="text-purple-400">Start your journey to the top!</p>
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
  
  const getBorderColor = () => {
    if (isFirst) return "border-yellow-400 shadow-lg shadow-yellow-400/25";
    if (index === 1) return "border-gray-300 shadow-lg shadow-gray-300/25";
    if (index === 2) return "border-orange-400 shadow-lg shadow-orange-400/25";
    return "border-purple-500/50";
  };
  
  const getBackgroundColor = () => {
    if (isFirst) return "bg-gradient-to-r from-yellow-900/20 to-amber-900/20";
    if (index === 1) return "bg-gradient-to-r from-gray-800/20 to-slate-800/20";
    if (index === 2) return "bg-gradient-to-r from-orange-900/20 to-amber-900/20";
    return "bg-gradient-to-r from-gray-800/10 to-gray-700/10";
  };
  
  return (
    <div className={mergeClasses(
      "flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02]",
      getBorderColor(),
      getBackgroundColor()
    )}>
      {showRank && (
        <div className="flex-shrink-0">
          <div className={mergeClasses(
            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
            isFirst ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900" :
            index === 1 ? "bg-gradient-to-br from-gray-300 to-slate-400 text-gray-900" :
            index === 2 ? "bg-gradient-to-br from-orange-400 to-amber-500 text-orange-900" :
            "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
          )}>
            #{entry.rank}
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-4 flex-1">
        {showAvatar && (
          <div className="flex-shrink-0">
            <Avatar
              src={entry.avatar}
              alt={entry.name}
              size="md"
              fallback={entry.name.charAt(0)}
              className="ring-2 ring-purple-400/50"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={mergeClasses(
            "font-bold truncate text-lg",
            isFirst ? "text-yellow-300" : 
            index === 1 ? "text-gray-200" :
            index === 2 ? "text-orange-300" : "text-purple-200"
          )}>
            {entry.name}
          </h3>
          {entry.metadata?.rank && (
            <p className="text-sm text-purple-400 truncate">{entry.metadata.rank}</p>
          )}
        </div>
      </div>
      
      {showScore && (
        <div className="flex-shrink-0 text-right">
          <div className={mergeClasses(
            "text-2xl font-bold",
            isFirst ? "text-yellow-300" : 
            index === 1 ? "text-gray-200" :
            index === 2 ? "text-orange-300" : "text-cyan-300"
          )}>
            {entry.score.toLocaleString()}
          </div>
          {entry.metadata?.kills && (
            <p className="text-xs text-purple-400 mt-1">Kills: {entry.metadata.kills}</p>
          )}
        </div>
      )}
    </div>
  );
}; 