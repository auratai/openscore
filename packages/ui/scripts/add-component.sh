#!/bin/bash

# Script to add a new shadcn/ui component
# Usage: ./scripts/add-component.sh <component-name>

if [ $# -eq 0 ]; then
    echo "Usage: $0 <component-name>"
    echo "Example: $0 card"
    exit 1
fi

COMPONENT_NAME=$1

echo "Adding shadcn/ui component: $COMPONENT_NAME"

# Install shadcn/ui CLI if not already installed
if ! command -v npx &> /dev/null; then
    echo "npx is required but not installed. Please install Node.js and npm."
    exit 1
fi

# Add the component using shadcn/ui CLI
npx shadcn@latest add $COMPONENT_NAME --yes

# Move the component from ui/ subdirectory to main components directory
if [ -f "src/components/ui/$COMPONENT_NAME.tsx" ]; then
  mv "src/components/ui/$COMPONENT_NAME.tsx" "src/components/$COMPONENT_NAME.tsx"
  echo "Moved component to src/components/$COMPONENT_NAME.tsx"
fi

# Fix import paths in the component
if [ -f "src/components/$COMPONENT_NAME.tsx" ]; then
  # Replace @/lib/utils with relative import
  sed -i '' 's|@/lib/utils|../lib/utils|g' "src/components/$COMPONENT_NAME.tsx"
  echo "Fixed import paths in $COMPONENT_NAME.tsx"
fi

# Update exports automatically
pnpm update:exports

echo "✅ Component $COMPONENT_NAME has been added and exported!" 