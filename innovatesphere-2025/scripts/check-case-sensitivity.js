#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, '..', 'src');

console.log('🔍 Checking for case-sensitivity issues...\n');

const issues = [];
const fileMap = new Map();

function walkDirectory(dir, relativePath = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const relativeFilePath = path.join(relativePath, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      walkDirectory(fullPath, relativeFilePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      checkFileImports(fullPath, relativeFilePath);
      
      // Check for duplicate filenames with different cases in the same directory
      const lowerCaseFile = file.toLowerCase();
      const fullLowerCasePath = path.join(relativePath, lowerCaseFile);
      if (fileMap.has(fullLowerCasePath)) {
        issues.push({
          type: 'duplicate-case',
          message: `Potential case conflict: ${fileMap.get(fullLowerCasePath)} and ${relativeFilePath}`,
          file: relativeFilePath
        });
      } else {
        fileMap.set(fullLowerCasePath, relativeFilePath);
      }
    }
  });
}

function checkFileImports(filePath, relativeFilePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, lineNumber) => {
    // Check import statements
    const importMatch = line.match(/import.*from\s+['"`]([^'"`]+)['"`]/);
    if (importMatch) {
      const importPath = importMatch[1];
      
      // Skip external modules
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        return;
      }
      
      // Resolve the import path
      const resolvedPath = resolveImportPath(filePath, importPath);
      if (resolvedPath && !fs.existsSync(resolvedPath)) {
        // Check if a case-different version exists
        const dir = path.dirname(resolvedPath);
        const filename = path.basename(resolvedPath);
        
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          const caseInsensitiveMatch = files.find(f => 
            f.toLowerCase() === filename.toLowerCase() && f !== filename
          );
          
          if (caseInsensitiveMatch) {
            issues.push({
              type: 'import-case',
              message: `Case mismatch in import: "${importPath}" should be "${importPath.replace(filename, caseInsensitiveMatch)}"`,
              file: relativeFilePath,
              line: lineNumber + 1
            });
          }
        }
      }
    }
    
    // Check dynamic imports
    const dynamicImportMatch = line.match(/import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/);
    if (dynamicImportMatch) {
      const importPath = dynamicImportMatch[1];
      
      if (importPath.startsWith('.') || importPath.startsWith('/')) {
        const resolvedPath = resolveImportPath(filePath, importPath);
        if (resolvedPath && !fs.existsSync(resolvedPath)) {
          const dir = path.dirname(resolvedPath);
          const filename = path.basename(resolvedPath);
          
          if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            const caseInsensitiveMatch = files.find(f => 
              f.toLowerCase() === filename.toLowerCase() && f !== filename
            );
            
            if (caseInsensitiveMatch) {
              issues.push({
                type: 'dynamic-import-case',
                message: `Case mismatch in dynamic import: "${importPath}" should be "${importPath.replace(filename, caseInsensitiveMatch)}"`,
                file: relativeFilePath,
                line: lineNumber + 1
              });
            }
          }
        }
      }
    }
  });
}

function resolveImportPath(fromFile, importPath) {
  const fromDir = path.dirname(fromFile);
  let resolvedPath = path.resolve(fromDir, importPath);
  
  // Try different extensions
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
  
  for (const ext of extensions) {
    const pathWithExt = resolvedPath + ext;
    if (fs.existsSync(pathWithExt)) {
      return pathWithExt;
    }
  }
  
  return resolvedPath;
}

// Run the check
walkDirectory(srcPath);

// Report results
console.log('📊 Case sensitivity check results:\n');

if (issues.length === 0) {
  console.log('✅ No case sensitivity issues found!');
} else {
  console.log(`❌ Found ${issues.length} case sensitivity issue(s):\n`);
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.type.toUpperCase()}`);
    console.log(`   File: ${issue.file}${issue.line ? `:${issue.line}` : ''}`);
    console.log(`   Issue: ${issue.message}\n`);
  });
  
  console.log('💡 Tips to fix case sensitivity issues:');
  console.log('   - Ensure import paths match exact file names');
  console.log('   - Use consistent naming conventions (kebab-case recommended)');
  console.log('   - Avoid files with names that differ only in case');
  console.log('   - Test builds on case-sensitive systems (Linux/macOS)');
}

console.log('\n' + '='.repeat(50));

if (issues.length === 0) {
  console.log('🎉 Case sensitivity validation passed!');
  process.exit(0);
} else {
  console.log('❌ Case sensitivity validation failed!');
  process.exit(1);
}