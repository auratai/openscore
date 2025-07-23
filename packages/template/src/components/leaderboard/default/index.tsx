import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";
import { Avatar } from "../../common/avatar";
import { ScoreDisplay } from "../../common/score-display";
import { RankBadge } from "../../common/rank-badge";
import type { LeaderboardTemplateProps, LeaderboardEntry, LeaderboardColumn } from "../../../types";
import { mergeClasses } from "../../../utils";

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({
  data,
  className
}) => {
  const { entries = [], title = "Leaderboard", columns = [] } = data;

  return (
    <Card className={mergeClasses("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <LeaderboardEntry
              key={entry.id}
              entry={entry}
              index={index}
              columns={columns}
              sortByColumn={data.sortByColumn}
            />
          ))}
          {entries.length === 0 && (
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
  columns: LeaderboardColumn[];
  sortByColumn?: string;
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  entry,
  index,
  columns,
  sortByColumn
}) => {
  const isTopThree = index < 3;
  
  // Get rank from entry data (set by useLeaderboard hook)
  const rank = entry.rank || index + 1;
  
  // Get the primary column (sortByColumn) for score display
  const primaryColumn = columns.find(col => col.name === sortByColumn);
  const score = primaryColumn ? entry[primaryColumn.name] : 0;
  
  // Find image column for avatar
  const imageColumn = columns.find(col => col.type === 'image');
  const avatar = imageColumn ? entry[imageColumn.name] : undefined;
  
  return (
    <div className={mergeClasses(
      "flex items-center gap-4 p-3 rounded-lg transition-colors",
      isTopThree ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200" : "hover:bg-gray-50"
    )}>
      <div className="flex-shrink-0">
        <RankBadge rank={rank} size="sm" />
      </div>
      
      <div className="flex-shrink-0">
        <Avatar
          src={avatar}
          alt={entry.id}
          size="sm"
          fallback={entry.id.charAt(0)}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={mergeClasses(
          "font-medium truncate",
          isTopThree ? "text-blue-900" : "text-gray-900"
        )}>
          {entry.id}
        </h3>
      </div>
      
      <div className="flex-shrink-0">
        <ScoreDisplay
          score={typeof score === 'number' ? score : 0}
          size="sm"
          variant={isTopThree ? "highlight" : "default"}
        />
      </div>
    </div>
  );
}; 