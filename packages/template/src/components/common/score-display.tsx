import * as React from "react";
import { cn } from "@openscore/ui";
import { formatScore } from "../../utils";

interface ScoreDisplayProps {
  score: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "highlight" | "muted";
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  size = "md",
  variant = "default",
  className
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const variantClasses = {
    default: "font-semibold text-gray-900",
    highlight: "font-bold text-blue-600",
    muted: "font-medium text-gray-500"
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {formatScore(score)}
    </span>
  );
}; 