#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const indexFile = path.join(componentsDir, 'index.ts');

// Get all TypeScript files in the components directory (excluding index.ts)
const componentFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  .filter(file => file !== 'index.ts')
  .map(file => file.replace(/\.(tsx|ts)$/, ''));

// Generate the index.ts content
const indexContent = `// Auto-generated exports - run 'pnpm update:exports' to regenerate
${componentFiles.map(file => `export * from "./${file}"`).join('\n')}
`;

// Write the index file
fs.writeFileSync(indexFile, indexContent);

console.log('✅ Updated component exports:');
componentFiles.forEach(file => console.log(`  - ${file}`));
console.log(`\n📝 Updated ${indexFile}`); 