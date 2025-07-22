import * as React from "react";
import { cn } from "@openscore/ui";
import { getRankSuffix } from "../../utils";

interface RankBadgeProps {
  rank: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gold" | "silver" | "bronze";
  className?: string;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = "md",
  variant = "default",
  className
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base"
  };

  const variantClasses = {
    default: "bg-gray-100 text-gray-700",
    gold: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    silver: "bg-gray-100 text-gray-700 border border-gray-300",
    bronze: "bg-orange-100 text-orange-800 border border-orange-300"
  };

  const getVariant = (rank: number): "default" | "gold" | "silver" | "bronze" => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "default";
  };

  const actualVariant = variant === "default" ? getVariant(rank) : variant;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold",
        sizeClasses[size],
        variantClasses[actualVariant],
        className
      )}
    >
      {rank}{getRankSuffix(rank)}
    </div>
  );
}; 