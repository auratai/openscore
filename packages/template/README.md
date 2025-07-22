# @openscore/template

A collection of reusable React components for leaderboard and scoreboard templates.

## Features

- **Leaderboard Templates**: Pre-built leaderboard components with customizable styling
- **Scoreboard Templates**: Scoreboard components (coming soon)
- **Common Components**: Reusable UI components like avatars, score displays, and rank badges
- **Custom Hooks**: React hooks for managing leaderboard and scoreboard state
- **Utility Functions**: Helper functions for formatting scores, ranks, and data manipulation

## Installation

This package is part of the OpenScore monorepo and is automatically available to other packages in the workspace.

## Usage

### Leaderboard Template

```tsx
import { LeaderboardTemplate } from "@openscore/template";
import { useLeaderboard } from "@openscore/template/hooks";

const MyComponent = () => {
  const { entries, addEntry } = useLeaderboard([
    { id: "1", rank: 1, name: "Player 1", score: 1000 },
    { id: "2", rank: 2, name: "Player 2", score: 850 },
  ]);

  return (
    <LeaderboardTemplate
      entries={entries}
      title="Game Leaderboard"
      maxEntries={10}
      showRank={true}
      showScore={true}
      showAvatar={true}
    />
  );
};
```

### Common Components

```tsx
import { Avatar, ScoreDisplay, RankBadge } from "@openscore/template";

// Avatar component
<Avatar src="/avatar.jpg" alt="User Avatar" size="md" />

// Score display with formatting
<ScoreDisplay score={1234} size="lg" variant="highlight" />

// Rank badge with automatic styling
<RankBadge rank={1} size="md" />
```

### Custom Hooks

```tsx
import { useLeaderboard, useScoreboard } from "@openscore/template/hooks";

// Leaderboard hook
const { entries, addEntry, updateEntry, removeEntry } = useLeaderboard();

// Scoreboard hook
const { entries, addEntry, updateEntry, removeEntry } = useScoreboard();
```

### Utility Functions

```tsx
import { formatScore, getRankSuffix, sortByScore } from "@openscore/template/utils";

formatScore(1234); // "1.2K"
getRankSuffix(1); // "st"
sortByScore(entries); // Sorted by score descending
```

## Components

### Leaderboard Template

- `LeaderboardTemplate`: Main leaderboard component with customizable options
- Supports avatars, ranks, scores, and custom styling
- Automatic sorting and entry limiting
- Top 3 highlighting

### Common Components

- `Avatar`: Reusable avatar component with fallback support
- `ScoreDisplay`: Formatted score display with size and variant options
- `RankBadge`: Rank badge with automatic ordinal suffixes and styling

### Scoreboard Template

- Coming soon...

## Types

All TypeScript types are exported from the main package:

```tsx
import type { 
  LeaderboardEntry, 
  LeaderboardTemplateProps,
  ScoreboardEntry,
  ScoreboardTemplateProps 
} from "@openscore/template";
```

## Development

To add new templates or components:

1. Create the component in the appropriate directory
2. Export it from the corresponding `index.ts` file
3. Add types if needed in `src/types/index.ts`
4. Update this README with usage examples 