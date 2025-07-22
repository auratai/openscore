# @openscore/ui

A shared UI component library built with shadcn/ui, Radix UI, and Tailwind CSS.

## Installation

This package is part of the OpenScore monorepo and should be installed as a workspace dependency.

## Usage

### Importing Components

```tsx
import { Button } from "@openscore/ui/components/button"
import { Button } from "@openscore/ui/components" // Alternative import
```

### Importing Utilities

```tsx
import { cn } from "@openscore/ui/lib/utils"
```

### Importing Styles

```tsx
import "@openscore/ui/styles/globals.css"
```

## Available Components

- **Button** - A versatile button component with multiple variants and sizes

## Adding New Components

### Automated Method (Recommended)
```bash
# Add a new shadcn/ui component (automatically handles everything)
pnpm add:component <component-name>

# Examples:
pnpm add:component button
pnpm add:component card
pnpm add:component input
pnpm add:component dialog
```

This command will:
1. ✅ Download the component from shadcn/ui
2. ✅ Move it to the correct location
3. ✅ Fix import paths automatically
4. ✅ Update exports automatically
5. ✅ Ready to use immediately

### Manual Method
1. Create a new component file in `src/components/`
2. Follow the shadcn/ui patterns using:
   - `class-variance-authority` for variants
   - `@radix-ui` primitives for accessibility
   - `cn` utility for class merging
3. Run `pnpm update:exports` to update exports
4. Update this README with component documentation

## Development

```bash
# Install dependencies
pnpm install

# Lint the code
pnpm lint
```

## Dependencies

- **Radix UI** - Accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Class name utilities 