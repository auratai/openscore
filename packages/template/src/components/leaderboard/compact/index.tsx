import type * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@openscore/ui"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@openscore/ui"
import { Badge } from "@openscore/ui"
import { Trophy, Medal, Award, Calendar, MapPin, Target } from "lucide-react"
import type { LeaderboardTemplateProps, LeaderboardEntry, LeaderboardColumn } from "../../../types"

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

  return (
    <Card className={mergeClasses("w-full max-w-7xl mx-auto shadow-lg border-border", className)}>
      <CardHeader className="pb-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-t-lg border-b border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          <CardTitle className="text-3xl font-bold gradient-text">
            {title}
          </CardTitle>
        </div>
        {subheading && <p className="text-lg text-muted-foreground font-medium">{subheading}</p>}
        {description && <p className="text-sm text-muted-foreground/80 mt-1">{description}</p>}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/20 border-b-2 border-border">
                <TableHead className="px-6 py-4 text-left text-sm font-bold text-foreground uppercase tracking-wider w-24">
                  Rank
                </TableHead>
                {columns.filter(column => column.name !== 'u_rank').map((column) => (
                  <TableHead
                    key={column.name}
                    className="px-6 py-4 text-left text-sm font-bold text-foreground uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      {column.name === "score" && <Target className="w-4 h-4 text-muted-foreground" />}
                      {column.name === "country" && <MapPin className="w-4 h-4 text-muted-foreground" />}
                      {column.name === "joinDate" && <Calendar className="w-4 h-4 text-muted-foreground" />}
                      {getColumnDisplayName(column)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border">
              {entries.map((entry, index) => (
                <LeaderboardEntryComponent
                  key={entry.id}
                  entry={entry}
                  index={index}
                  columns={columns}
                  sortByColumn={data.sortByColumn}
                />
              ))}

              {entries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-16 bg-muted/20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-6xl">🏆</div>
                      <div>
                        <p className="text-xl font-semibold text-muted-foreground mb-2">No entries yet</p>
                        <p className="text-muted-foreground/70">Be the first to join the leaderboard!</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

interface LeaderboardEntryProps {
  entry: LeaderboardEntry
  index: number
  columns: LeaderboardColumn[]
  sortByColumn?: string
}

const LeaderboardEntryComponent: React.FC<LeaderboardEntryProps> = ({ entry, index, columns, sortByColumn }) => {
  const rank = entry.u_rank || index + 1
  const isTopThree = rank <= 3

  const getRowStyles = () => {
    const baseStyles = "transition-all duration-300 hover:shadow-md"

    switch (rank) {
      case 1:
        return `${baseStyles} row-gradient-1 hover:from-yellow-100 hover:via-amber-100 hover:to-yellow-100 dark:hover:from-yellow-900/20 dark:hover:via-amber-900/20 dark:hover:to-yellow-900/20`
      case 2:
        return `${baseStyles} row-gradient-2 hover:from-gray-100 hover:via-slate-100 hover:to-gray-100 dark:hover:from-gray-800/20 dark:hover:via-slate-800/20 dark:hover:to-gray-800/20`
      case 3:
        return `${baseStyles} row-gradient-3 hover:from-amber-100 hover:via-orange-100 hover:to-amber-100 dark:hover:from-amber-900/20 dark:hover:via-orange-900/20 dark:hover:to-amber-900/20`
      default:
        return `${baseStyles} hover:bg-accent/50 border-l-4 border-transparent hover:border-accent-foreground/20`
    }
  }

  return (
    <TableRow className={getRowStyles()}>
      {/* Rank Column */}
      <TableCell className="px-6 py-5">
        <div className="flex items-center gap-3">
          {getRankIcon(rank)}
          {getRankBadge(rank)}
        </div>
      </TableCell>

      {/* Dynamic Columns */}
      {columns.filter(column => column.name !== 'u_rank').map((column) => {
        let value = entry[column.name]

        // Try different ways to access the data
        if (value === undefined && entry.data && entry.data[column.name]) {
          value = entry.data[column.name]
        }

        if (value === undefined && entry.metadata && entry.metadata[column.name]) {
          value = entry.metadata[column.name]
        }

        const isHighlighted = column.name === sortByColumn && isTopThree

        return (
          <TableCell
            key={column.name}
            className={mergeClasses(
              "px-6 py-5 text-sm",
              isHighlighted ? "font-bold text-foreground" : "text-muted-foreground",
              column.name === "name" ? "font-semibold text-base text-foreground" : "",
            )}
          >
            <div className="flex items-center gap-2">
              {column.name === "score" && isTopThree && <div className="w-2 h-2 rounded-full bg-green-400 dark:bg-green-500"></div>}
              {formatColumnValue(value, column.type)}
            </div>
          </TableCell>
        )
      })}
    </TableRow>
  )
}
