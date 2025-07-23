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
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />
    default:
      return null
  }
}

const getRankBadge = (rank: number) => {
  if (rank <= 3) {
    const colors = {
      1: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
      2: "bg-gradient-to-r from-gray-300 to-gray-500 text-white",
      3: "bg-gradient-to-r from-amber-400 to-amber-600 text-white",
    }
    return <Badge className={`${colors[rank as keyof typeof colors]} font-bold px-3 py-1`}>#{rank}</Badge>
  }
  return (
    <Badge variant="outline" className="font-semibold px-3 py-1">
      #{rank}
    </Badge>
  )
}

export const Leaderboard: React.FC<LeaderboardTemplateProps> = ({ data, className }) => {
  const { entries = [], title = "Leaderboard", columns = [], subheading, description } = data

  return (
    <Card className={mergeClasses("w-full max-w-7xl mx-auto shadow-lg", className)}>
      <CardHeader className="pb-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </div>
        {subheading && <p className="text-lg text-gray-600 font-medium">{subheading}</p>}
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-slate-50 border-b-2 border-gray-200">
                <TableHead className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-24">
                  Rank
                </TableHead>
                {columns.map((column) => (
                  <TableHead
                    key={column.name}
                    className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      {column.name === "score" && <Target className="w-4 h-4" />}
                      {column.name === "country" && <MapPin className="w-4 h-4" />}
                      {column.name === "joinDate" && <Calendar className="w-4 h-4" />}
                      {getColumnDisplayName(column)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
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
                  <TableCell colSpan={columns.length + 1} className="text-center py-16 bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-6xl">🏆</div>
                      <div>
                        <p className="text-xl font-semibold text-gray-600 mb-2">No entries yet</p>
                        <p className="text-gray-500">Be the first to join the leaderboard!</p>
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
        return `${baseStyles} bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-l-4 border-yellow-400 hover:from-yellow-100 hover:to-amber-100`
      case 2:
        return `${baseStyles} bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border-l-4 border-gray-400 hover:from-gray-100 hover:to-slate-100`
      case 3:
        return `${baseStyles} bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-l-4 border-amber-500 hover:from-amber-100 hover:to-orange-100`
      default:
        return `${baseStyles} hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-200`
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
      {columns.map((column) => {
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
              isHighlighted ? "font-bold text-gray-900" : "text-gray-700",
              column.name === "name" ? "font-semibold text-base" : "",
            )}
          >
            <div className="flex items-center gap-2">
              {column.name === "score" && isTopThree && <div className="w-2 h-2 rounded-full bg-green-400"></div>}
              {formatColumnValue(value, column.type)}
            </div>
          </TableCell>
        )
      })}
    </TableRow>
  )
}
