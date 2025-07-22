# OpenScore Leaderboard System

A robust, multi-template leaderboard system with automatic template selection, real-time updates, and comprehensive error handling.

## Features

### 🎯 **Multiple Templates**
- **Default Template**: Clean, professional design
- **Compact Template**: Minimalist layout with enhanced spacing
- **Gaming Template**: Dark theme with neon accents and gaming aesthetics

### 🔄 **Automatic Template Selection**
The system automatically chooses the appropriate template based on the `templateType` field in the database:
- `gaming` or `game` → Gaming Template
- `compact` or `minimal` → Compact Template
- Any other value → Default Template

### 🛡️ **Robust Error Handling**
- Loading states with skeleton animations
- Comprehensive error messages with retry functionality
- Graceful fallbacks for missing data
- Network error recovery

### ⚡ **Real-time Features**
- Auto-refresh capability (configurable interval)
- Manual refresh functionality
- Optimistic updates for better UX

## Database Schema

```sql
model Leaderboard {
  id            String   @id @default(cuid())
  viewId        String   @unique @default(cuid())  // Public ID for viewing
  editId        String   @unique @default(cuid())  // Private ID for editing
  title         String
  subheading    String?
  description   String?
  url           String?
  note          String?
  templateType  String?  // Determines which template to use
  startDate     DateTime?
  endDate       DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  columns       Json     @default("[]")  // Column configuration
  sortByColumn  String?  // Column name for sorting
  entries       Json     @default("[]")  // Leaderboard entries
  
  @@map("leaderboards")
}
```

## Usage

### 1. Basic Usage

```tsx
import { useLeaderboard, LeaderboardTemplateSelector } from "@openscore/template";

function MyLeaderboardPage() {
  const { data, entries, loading, error } = useLeaderboard({
    leaderboardId: "your-leaderboard-id",
    autoRefresh: true,
    refreshInterval: 30000
  });

  return (
    <LeaderboardTemplateSelector
      data={data}
      loading={loading}
      error={error}
      entries={entries}
      maxEntries={50}
      showRank={true}
      showScore={true}
      showAvatar={true}
    />
  );
}
```

### 2. Advanced Usage with Custom Options

```tsx
const {
  data,
  entries,
  loading,
  error,
  refresh,
  addEntry,
  updateEntry,
  removeEntry
} = useLeaderboard({
  leaderboardId: "your-leaderboard-id",
  autoRefresh: true,
  refreshInterval: 15000 // Refresh every 15 seconds
});

// Add a new entry
await addEntry({
  name: "New Player",
  score: 1000,
  avatar: "https://example.com/avatar.jpg",
  metadata: { team: "Team A", level: 5 }
});

// Update an entry
await updateEntry("entry-id", { score: 1500 });

// Remove an entry
await removeEntry("entry-id");

// Manual refresh
await refresh();
```

### 3. URL-based Access

Access leaderboards via URL with the leaderboard ID:
```
/leaderboard?id=YOUR_LEADERBOARD_ID
```

The system supports multiple ID types:
- `viewId` (public access)
- `editId` (private access)
- Internal `id` (fallback)

## API Endpoints

### GET `/api/leaderboards/[id]`
Fetch leaderboard data by ID.

**Response:**
```json
{
  "id": "internal-id",
  "viewId": "public-view-id",
  "editId": "private-edit-id",
  "title": "Leaderboard Title",
  "subheading": "Subtitle",
  "description": "Description",
  "templateType": "gaming",
  "columns": [...],
  "entries": [...],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/leaderboards/[id]/entries`
Add a new entry to the leaderboard.

**Request Body:**
```json
{
  "name": "Player Name",
  "score": 1000,
  "avatar": "https://example.com/avatar.jpg",
  "metadata": { "team": "Team A" }
}
```

### PATCH `/api/leaderboards/[id]/entries/[entryId]`
Update an existing entry.

### DELETE `/api/leaderboards/[id]/entries/[entryId]`
Remove an entry from the leaderboard.

## Template Types

### Default Template
- Clean, professional design
- Suitable for business, academic, or general use
- Blue accent colors
- Card-based layout

### Compact Template
- Minimalist design with enhanced spacing
- Larger avatars and text for top 3 positions
- Color-coded borders for top positions
- Suitable for academic or professional leaderboards

### Gaming Template
- Dark theme with neon accents
- Gaming-inspired design elements
- Purple/pink gradient backgrounds
- Hover animations and scaling effects
- Perfect for gaming tournaments or competitions

## Error Handling

The system handles various error scenarios:

1. **Missing Leaderboard ID**: Shows helpful message with instructions
2. **Network Errors**: Displays error message with retry button
3. **404 Not Found**: Clear "Leaderboard not found" message
4. **Loading States**: Skeleton animations during data fetching
5. **Empty Data**: Encouraging message when no entries exist

## Development

### Setting up the Database

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up the database:**
   ```bash
   cd packages/database
   pnpm db:migrate:deploy
   pnpm db:seed
   ```

3. **Start the development server:**
   ```bash
   cd apps/web
   pnpm dev
   ```

### Sample Data

The seed script creates three sample leaderboards:

1. **Gaming Tournament 2024** (gaming template)
2. **Academic Excellence** (compact template)
3. **Sports Championship** (default template)

Access them using the IDs displayed in the console after running the seed script.

### Adding New Templates

1. Create a new template component in `packages/template/src/components/leaderboard/`
2. Export it from `packages/template/src/components/leaderboard/index.ts`
3. Add the template type logic to `LeaderboardTemplateSelector`
4. Update this documentation

## Best Practices

1. **Template Selection**: Use descriptive `templateType` values for automatic selection
2. **Error Handling**: Always handle loading and error states in your UI
3. **Performance**: Use appropriate `refreshInterval` values (15-60 seconds recommended)
4. **Data Validation**: Validate entry data before sending to the API
5. **Accessibility**: Ensure your custom templates meet accessibility standards

## Troubleshooting

### Common Issues

1. **"Cannot find module '@repo/database'"**
   - Ensure the database package is added to your app's dependencies
   - Run `pnpm install` to update dependencies

2. **"Leaderboard not found"**
   - Verify the leaderboard ID is correct
   - Check if the database is properly seeded
   - Ensure the API routes are working

3. **Template not switching**
   - Verify the `templateType` field in the database
   - Check the template selection logic in `LeaderboardTemplateSelector`

4. **Auto-refresh not working**
   - Ensure `autoRefresh` is set to `true`
   - Check the `refreshInterval` value
   - Verify network connectivity

### Debug Mode

In development mode, the leaderboard page shows debug information including:
- Loading state
- Error messages
- Entry count
- Template type
- Manual refresh button

This helps with development and troubleshooting. 