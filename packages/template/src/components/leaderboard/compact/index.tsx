import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui";
import { Avatar } from "../../common/avatar";
import { ScoreDisplay } from "../../common/score-display";
import { RankBadge } from "../../common/rank-badge";
import type { LeaderboardTemplateProps, LeaderboardEntry, LeaderboardColumn } from "../../../types";
import { mergeClasses, formatColumnValue, getColumnDisplayName } from "../../../utils";

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({
  data,
  className
}) => {
  const { entries = [], title = "Leaderboard", columns = [] } = data;

  // Debug logging
  console.log('Leaderboard Data:', data);
  console.log('Entries:', entries);
  console.log('Columns:', columns);

  return (
    <Card className={mergeClasses("w-full max-w-6xl", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                {columns.map((column) => (
                  <th 
                    key={column.name}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {getColumnDisplayName(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                <tr>
                  <td colSpan={columns.length + 2} className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-2">🏆</div>
                    <p className="text-lg">No entries yet</p>
                    <p className="text-sm">Be the first to join!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  const isFirst = index === 0;
  
  // Get rank from entry data (set by useLeaderboard hook)
  const rank = entry.rank || index + 1;
  
  // Find image column for avatar
  const imageColumn = columns.find(col => col.type === 'image');
  const avatar = imageColumn ? entry[imageColumn.name] : undefined;
  
  // Get metadata for additional info
  const metadata = entry.metadata || {};
  
  const getRowBackgroundColor = () => {
    if (isFirst) return "bg-gradient-to-r from-yellow-50 to-amber-50";
    if (index === 1) return "bg-gradient-to-r from-gray-50 to-slate-50";
    if (index === 2) return "bg-gradient-to-r from-orange-50 to-amber-50";
    return "hover:bg-gray-50";
  };
  
  const getTextColor = () => {
    if (isFirst) return "text-yellow-900";
    if (index === 1) return "text-gray-900";
    if (index === 2) return "text-orange-900";
    return "text-gray-900";
  };
  
  return (
    <tr className={mergeClasses("transition-all duration-200", getRowBackgroundColor())}>
      {/* Rank Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <RankBadge 
            rank={rank} 
            size={isTopThree ? "lg" : "md"}
            variant={isTopThree ? "default" : "default"}
          />
        </div>
      </td>
      
      {/* Player Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Avatar
              src={avatar}
              alt={entry.id}
              size={isTopThree ? "lg" : "md"}
              fallback={entry.id.charAt(0)}
            />
          </div>
          <div className="ml-4">
            <div className={mergeClasses("text-sm font-medium", getTextColor())}>
              {entry.id}
            </div>
            {metadata.team && (
              <div className="text-sm text-gray-500">{metadata.team}</div>
            )}
          </div>
        </div>
      </td>
      
      {/* Dynamic Columns */}
      {columns.map((column) => {
        // Try different ways to access the data
        let value = entry[column.name];
        
        // If not found directly, try nested access
        if (value === undefined && entry.data && entry.data[column.name]) {
          value = entry.data[column.name];
        }
        
        // If still not found, try metadata
        if (value === undefined && entry.metadata && entry.metadata[column.name]) {
          value = entry.metadata[column.name];
        }
        
        // Debug logging to see what's happening
        console.log(`Column: ${column.name}, Type: ${column.type}, Value:`, value, 'Entry:', entry);
        
        return (
          <td key={column.name} className="px-6 py-4 whitespace-nowrap text-sm">
            {column.type === 'image' ? (
              <Avatar
                src={value}
                alt={`${entry.id} ${column.name}`}
                size="sm"
                fallback={entry.id.charAt(0)}
              />
            ) : column.type === 'number' && column.name === sortByColumn ? (
              <ScoreDisplay
                score={typeof value === 'number' ? value : 0}
                size={isTopThree ? "lg" : "md"}
                variant={isTopThree ? "highlight" : "default"}
              />
            ) : (
              <span className={mergeClasses("text-sm", getTextColor())}>
                {formatColumnValue(value, column.type)}
              </span>
            )}
          </td>
        );
      })}
      
      {/* Fallback: Show raw entry data for debugging */}
      {columns.length === 0 && (
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <pre className="text-xs text-gray-500">
            {JSON.stringify(entry, null, 2)}
          </pre>
        </td>
      )}
    </tr>
  );
}; 