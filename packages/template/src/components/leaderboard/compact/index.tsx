import type * as React from "react"
import { DataTable } from "@openscore/ui"
import { Badge } from "@openscore/ui"
import { Trophy, Medal, Award, Calendar, MapPin, Target } from "lucide-react"
import type { LeaderboardTemplateProps, LeaderboardEntry, LeaderboardColumn } from "../../../types"
import { TopThree } from "./topThree"

// Utility functions
const mergeClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

const formatColumnValue = (value: any, type: string) => {
  if (value === null || value === undefined) return "-"

  switch (type) {
    case "number":
      return typeof value === "number" ? value.toLocaleString() : value
    case "date":
      return new Date(value).toLocaleDateString()
    case "boolean":
      return value ? "Yes" : "No"
    default:
      return String(value)
  }
}

const getColumnDisplayName = (column: LeaderboardColumn) => {
  return column.displayName || column.name
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400 dark:text-gray-300" />
    case 3:
      return <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    default:
      return null
  }
}

const getRankBadge = (rank: number) => {
  if (rank <= 3) {
    const badgeClasses = {
      1: "rank-badge-1",
      2: "rank-badge-2", 
      3: "rank-badge-3",
    }
    return <Badge className={`${badgeClasses[rank as keyof typeof badgeClasses]} font-bold px-3 py-1`}>#{rank}</Badge>
  }
  return (
    <Badge variant="outline" className="font-semibold px-3 py-1 border-border text-foreground">
      #{rank}
    </Badge>
  )
}

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({ data, className }) => {
  const { entries = [], title = "Leaderboard", columns = [], subheading, description } = data

  // Create column definitions for the data table
  const tableColumns = [
    {
      accessorKey: "u_rank",
      header: "Rank",
      cell: ({ row }: any) => {
        const rank = row.original.u_rank || row.index + 1
        return (
          <div className="flex items-center gap-3">
            {getRankIcon(rank)}
            {getRankBadge(rank)}
          </div>
        )
      },
      enableSorting: false,
    },
    ...columns
      .filter(column => column.name !== 'u_rank')
      .map((column) => ({
        accessorKey: column.name,
        header: () => (
          <div className="flex items-center gap-2">
            {column.name === "score" && <Target className="w-4 h-4 text-muted-foreground" />}
            {column.name === "country" && <MapPin className="w-4 h-4 text-muted-foreground" />}
            {column.name === "joinDate" && <Calendar className="w-4 h-4 text-muted-foreground" />}
            {getColumnDisplayName(column)}
          </div>
        ),
        cell: ({ row }: any) => {
          const entry = row.original
          let value = entry[column.name]

          // Try different ways to access the data
          if (value === undefined && entry.data && entry.data[column.name]) {
            value = entry.data[column.name]
          }

          if (value === undefined && entry.metadata && entry.metadata[column.name]) {
            value = entry.metadata[column.name]
          }

          const rank = entry.u_rank || row.index + 1
          const isTopThree = rank <= 3
          const isHighlighted = column.name === data.sortByColumn && isTopThree

          return (
            <div className="flex items-center gap-2">
              {column.name === "score" && isTopThree && <div className="w-2 h-2 rounded-full bg-green-400 dark:bg-green-500"></div>}
              <span className={mergeClasses(
                isHighlighted ? "font-bold text-foreground" : "text-muted-foreground",
                column.name === "name" ? "font-semibold text-base text-foreground" : "",
              )}>
                {formatColumnValue(value, column.type)}
              </span>
            </div>
          )
        },
        enableSorting: column.sortable !== false,
      }))
  ]

  return (
    <div className={mergeClasses("w-full max-w-7xl mx-auto", className)}>
      {/* Header */}
      <TopThree data={data} />

      {/* Data Table */}
      <DataTable
        columns={tableColumns}
        data={entries}
        searchKey="name"
        searchPlaceholder="Search entries..."
        showColumnToggle={true}
        showPagination={entries.length > 10}
        className="bg-background rounded-lg border shadow-sm"
      />

      {/* Empty State */}
      {entries.length === 0 && (
        <div className="text-center py-16 bg-muted/20 rounded-lg border">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl">🏆</div>
            <div>
              <p className="text-xl font-semibold text-muted-foreground mb-2">No entries yet</p>
              <p className="text-muted-foreground/70">Be the first to join the leaderboard!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
