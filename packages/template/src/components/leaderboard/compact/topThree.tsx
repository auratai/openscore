"use client";
import { cn } from "@openscore/ui/lib";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import Steps from "./steps";

type TopThreeProps = {
  data: {
    entries?: any[];
    title?: string;
    subheading?: string;
    sortByColumn?: string;
    columns?: any[];
  };
};

export function TopThree({ data }: TopThreeProps) {
  const { 
    entries = [], 
    title = "Leaderboard", 
    subheading, 
    sortByColumn = "score" 
  } = data || {};

  const [topThree, setTopThree] = useState<any[]>([]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const displayName = data?.columns?.find((column: any) => column.name === sortByColumn)?.displayName || "";
    const imageColumn = data?.columns?.find((column: any) => column.type === "image")?.name || "";
    const newTopThree: any[] = [];
    
    entries?.slice(0, 3).forEach((entry: any, index: number) => {
      const rank = index + 1;
      const rankIcon = getRankIcon(rank);
      
      // Get the sort by column value
      let sortValue = entry?.[sortByColumn];
      if (sortValue === undefined && entry?.data?.[sortByColumn]) {
        sortValue = entry.data[sortByColumn];
      }
      if (sortValue === undefined && entry?.metadata?.[sortByColumn]) {
        sortValue = entry.metadata[sortByColumn];
      }

      // Get the name value
      let name = entry?.name;
      if (!name && data?.columns) {
        const nameColumn = data.columns.find(col => 
          col.type === "string" && ["name", "username", "user"].includes(col.name.toLowerCase())
        );
        if (nameColumn) {
          name = entry?.[nameColumn.name] || entry?.data?.[nameColumn.name] || entry?.metadata?.[nameColumn.name];
        }
      }

      newTopThree.push({ 
        rank, 
        name: name || `Player ${rank}`,
        value: formatValue(sortValue), 
        sortByColumnDisplayName: displayName,
        image: entry?.[imageColumn] || `https://picsum.photos/100/100?random=${rank}`
      });
    });
    
    setTopThree(newTopThree);
  }, [data?.columns, sortByColumn, entries]);

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "number") return value.toLocaleString();
    return String(value);
  };

  return (
    <div className="w-full">
      <LeaderboardHeader title={title} subheading={subheading} />
      
      {/* Top 3 Entries - Keep the original Steps component */}
      <div className="mt-8">
        <Steps data={topThree} />
      </div>
      
      {/* Top Players Cards */}

    </div>
  );
}

// Leaderboard Header Component
function LeaderboardHeader({ title, subheading }: { title: string; subheading?: string }) {
  return (
    <div className="relative">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

        </div>
        
        {subheading && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            {subheading}
          </p>
        )}
      </div>
      
      {/* Decorative line */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-4" />
    </div>
  );
}

// Player Card Component

