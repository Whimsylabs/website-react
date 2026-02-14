#!/usr/bin/env node

/**
 * Migration helper script for adding i18n support to existing components
 * Usage: node scripts/migrate-component-i18n.js <component-path>
 */

const fs = require("fs");
const path = require("path");

function migrateComponent(componentPath) {
  if (!fs.existsSync(componentPath)) {
    console.error(`❌ Component not found: ${componentPath}`);
    process.exit(1);
  }

  console.log(`🔄 Migrating component: ${componentPath}`);

  let content = fs.readFileSync(componentPath, "utf8");
  let modified = false;

  // Add imports if not present
  if (!content.includes("withTranslation")) {
    const importMatch = content.match(/import React[^;]*;/);
    if (importMatch) {
      const newImports = `${importMatch[0]}
import withTranslation from './withTranslation';
import { getLocalizedPath } from '../i18n';`;
      content = content.replace(importMatch[0], newImports);
      modified = true;
    }
  }

  // Update component function signature
  const componentMatch = content.match(/const (\w+) = \(\) => {/);
  if (componentMatch) {
    const componentName = componentMatch[1];
    content = content.replace(
      `const ${componentName} = () => {`,
      `const ${componentName} = ({ t, currentLang }) => {`
    );
    modified = true;
  }

  // Update export
  const exportMatch = content.match(/export default (\w+);/);
  if (exportMatch && !content.includes("withTranslation")) {
    const componentName = exportMatch[1];
    content = content.replace(
      `export default ${componentName};`,
      `export default withTranslation(${componentName});`
    );
    modified = true;
  }

  // Common text replacements (you can extend this)
  const textReplacements = [
    { from: '"Home"', to: "{t('nav.home')}" },
    { from: '"Blog"', to: "{t('nav.blog')}" },
    { from: '"Contact"', to: "{t('nav.contact')}" },
    { from: '"Features"', to: "{t('nav.features')}" },
    { from: '"FAQ"', to: "{t('nav.faq')}" },
    { from: '"Services"', to: "{t('nav.services')}" },
  ];

  textReplacements.forEach(({ from, to }) => {
    if (content.includes(from)) {
      content = content.replace(new RegExp(from, "g"), to);
      modified = true;
    }
  });

  if (modified) {
    // Create backup
    const backupPath = `${componentPath}.backup`;
    fs.writeFileSync(backupPath, fs.readFileSync(componentPath));

    // Write modified content
    fs.writeFileSync(componentPath, content);

    console.log(`✅ Component migrated: ${componentPath}`);
    console.log(`📁 Backup created: ${backupPath}`);
    console.log(
      `⚠️  Please review the changes and add missing translation keys!`
    );
  } else {
    console.log(`ℹ️  No changes needed for: ${componentPath}`);
  }
}

// Get component path from command line
const componentPath = process.argv[2];

if (!componentPath) {
  console.log(`
Usage: node scripts/migrate-component-i18n.js <component-path>

Example:
  node scripts/migrate-component-i18n.js src/Components/Header.js
  node scripts/migrate-component-i18n.js src/Components/Footer.js

This script will:
1. Add necessary imports
2. Update component props to include t and currentLang
3. Wrap export with withTranslation HOC
4. Replace common hardcoded strings with translation calls
5. Create a backup of the original file

After running this script, you'll need to:
1. Add the translation keys to src/i18n/translations.js
2. Review and test the component
3. Update any remaining hardcoded strings manually
`);
  process.exit(1);
}

migrateComponent(componentPath);
