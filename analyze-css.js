#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const stylesDir = path.join(__dirname, 'src/styles');
const outputFile = path.join(__dirname, 'src/styles/css-final-analysis.md');

// Stats tracking
const stats = {
  totalFiles: 0,
  totalLines: 0,
  totalSelectors: 0,
  totalDeclarations: 0,
  totalImportantRules: 0,
  cssSize: 0,
  standardizedFiles: 0,
  legacyFiles: 0,
  designTokenUsage: 0
};

// Set of modern design tokens
const designTokens = [
  '--theme-pink',
  '--theme-pink-light',
  '--theme-pink-lightest',
  '--theme-pink-dark',
  '--theme-purple',
  '--theme-purple-lighter',
  '--window-shadow',
  '--button-shadow',
  '--inset-shadow',
  '--active-shadow',
  '--dragging-shadow',
  '--elevated-shadow',
  '--animation-speed-fast',
  '--animation-speed-normal',
  '--animation-speed-slow'
];

// Function to count design token usage
function countDesignTokens(content) {
  let count = 0;
  designTokens.forEach(token => {
    const regex = new RegExp(`var\\(${token}\\)`, 'g');
    const matches = content.match(regex);
    if (matches) {
      count += matches.length;
    }
  });
  return count;
}

// Function to count CSS selectors
function countSelectors(content) {
  // Simple regex to count selectors (not perfect but gives an estimate)
  const selectorRegex = /[^{]+{/g;
  const matches = content.match(selectorRegex);
  return matches ? matches.length : 0;
}

// Function to count declarations
function countDeclarations(content) {
  // Count properties in CSS
  const declarationRegex = /:[^;]+;/g;
  const matches = content.match(declarationRegex);
  return matches ? matches.length : 0;
}

// Function to count !important rules
function countImportantRules(content) {
  const importantRegex = /!important/g;
  const matches = content.match(importantRegex);
  return matches ? matches.length : 0;
}

// Function to analyze a CSS file
function analyzeFile(filePath) {
  const fileStats = {
    name: path.basename(filePath),
    lines: 0,
    selectors: 0,
    declarations: 0,
    importantRules: 0,
    sizeBytes: 0,
    designTokenUsage: 0,
    isStandardized: filePath.includes('standardized')
  };
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  fileStats.lines = content.split('\n').length;
  fileStats.selectors = countSelectors(content);
  fileStats.declarations = countDeclarations(content);
  fileStats.importantRules = countImportantRules(content);
  fileStats.sizeBytes = Buffer.byteLength(content, 'utf8');
  fileStats.designTokenUsage = countDesignTokens(content);
  
  // Update global stats
  stats.totalLines += fileStats.lines;
  stats.totalSelectors += fileStats.selectors;
  stats.totalDeclarations += fileStats.declarations;
  stats.totalImportantRules += fileStats.importantRules;
  stats.cssSize += fileStats.sizeBytes;
  stats.designTokenUsage += fileStats.designTokenUsage;
  
  if (fileStats.isStandardized) {
    stats.standardizedFiles++;
  } else {
    stats.legacyFiles++;
  }
  
  return fileStats;
}

// Function to generate report
function generateReport(fileStats) {
  let report = `# CSS Standardization Final Analysis\n\n`;
  report += `**Generated on:** ${new Date().toLocaleDateString()}\n\n`;
  
  report += `## Overall Statistics\n\n`;
  report += `- **Total CSS Files:** ${stats.totalFiles}\n`;
  report += `- **Standardized Files:** ${stats.standardizedFiles}\n`;
  report += `- **Legacy Files:** ${stats.legacyFiles}\n`;
  report += `- **Total Lines of CSS:** ${stats.totalLines}\n`;
  report += `- **Total CSS Selectors:** ${stats.totalSelectors}\n`;
  report += `- **Total CSS Declarations:** ${stats.totalDeclarations}\n`;
  report += `- **Total !important Rules:** ${stats.totalImportantRules}\n`;
  report += `- **Total CSS Size:** ${(stats.cssSize / 1024).toFixed(2)} KB\n`;
  report += `- **Design Token Usage:** ${stats.designTokenUsage} references\n\n`;
  
  report += `## Standardization Progress\n\n`;
  const standardizationPercent = (stats.standardizedFiles / stats.totalFiles * 100).toFixed(2);
  report += `- **Standardization Percentage:** ${standardizationPercent}%\n`;
  report += `- **Design Token Adoption:** ${(stats.designTokenUsage / stats.totalDeclarations * 100).toFixed(2)}% of declarations\n\n`;
  
  report += `## File Analysis\n\n`;
  report += `| File | Lines | Selectors | Declarations | !important | Size (KB) | Design Tokens | Standardized |\n`;
  report += `| ---- | ----- | --------- | ------------ | ---------- | --------- | ------------- | ------------ |\n`;
  
  fileStats.forEach(file => {
    report += `| ${file.name} | ${file.lines} | ${file.selectors} | ${file.declarations} | ${file.importantRules} | ${(file.sizeBytes / 1024).toFixed(2)} | ${file.designTokenUsage} | ${file.isStandardized ? '✅' : '❌'} |\n`;
  });
  
  report += `\n## Recommendations\n\n`;
  
  if (stats.totalImportantRules > 0) {
    report += `- **Reduce !important Declarations:** There are ${stats.totalImportantRules} !important declarations that could be improved with better specificity management\n`;
  }
  
  if (stats.legacyFiles > 0) {
    report += `- **Complete Standardization:** ${stats.legacyFiles} files still need to be standardized\n`;
  }
  
  const tokenAdoptionPercent = (stats.designTokenUsage / stats.totalDeclarations * 100).toFixed(2);
  if (tokenAdoptionPercent < 70) {
    report += `- **Increase Design Token Usage:** Only ${tokenAdoptionPercent}% of declarations use design tokens\n`;
  }
  
  return report;
}

// Main execution
try {
  console.log('Analyzing CSS files...');
  console.log(`Looking in directory: ${stylesDir}`);
  
  if (!fs.existsSync(stylesDir)) {
    console.error(`Styles directory not found: ${stylesDir}`);
    process.exit(1);
  }
  
  const cssFiles = fs.readdirSync(stylesDir)
    .filter(file => file.endsWith('.css'))
    .map(file => path.join(stylesDir, file));
  
  console.log(`Found ${cssFiles.length} CSS files`);
  
  stats.totalFiles = cssFiles.length;
  
  const fileStats = cssFiles.map(file => {
    try {
      console.log(`Analyzing: ${file}`);
      return analyzeFile(file);
    } catch (err) {
      console.error(`Error analyzing file ${file}:`, err);
      return {
        name: path.basename(file),
        lines: 0,
        selectors: 0,
        declarations: 0,
        importantRules: 0,
        sizeBytes: 0,
        designTokenUsage: 0,
        isStandardized: file.includes('standardized'),
        error: err.message
      };
    }
  });
  
  // Sort files by standardized status, then by name
  fileStats.sort((a, b) => {
    if (a.isStandardized !== b.isStandardized) {
      return a.isStandardized ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  
  const report = generateReport(fileStats);
  fs.writeFileSync(outputFile, report);
  
  console.log(`Analysis complete! Report saved to ${outputFile}`);
  console.log(`Standardized Files: ${stats.standardizedFiles}/${stats.totalFiles} (${(stats.standardizedFiles / stats.totalFiles * 100).toFixed(2)}%)`);
} catch (err) {
  console.error('Error running CSS analysis:', err);
}
