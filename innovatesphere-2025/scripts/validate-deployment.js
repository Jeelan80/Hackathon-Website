#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
const requiredFiles = [
  'index.html',
  'assets',
  'vite.svg'
];

const requiredAssets = [
  /index-.*\.js$/,
  /index-.*\.css$/
];

console.log('🔍 Validating deployment build...\n');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ Error: dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Check required files
let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
}

// Check assets directory
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const assetFiles = fs.readdirSync(assetsPath);
  
  // Check for required asset patterns
  for (const pattern of requiredAssets) {
    const found = assetFiles.some(file => pattern.test(file));
    if (!found) {
      console.error(`❌ Missing required asset matching pattern: ${pattern}`);
      allFilesExist = false;
    } else {
      const matchingFile = assetFiles.find(file => pattern.test(file));
      console.log(`✅ Found asset: ${matchingFile}`);
    }
  }
  
  // Check asset sizes
  assetFiles.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    
    if (file.endsWith('.js') && sizeKB > 500) {
      console.warn(`⚠️  Large JS file: ${file} (${sizeKB}KB)`);
    } else if (file.endsWith('.css') && sizeKB > 100) {
      console.warn(`⚠️  Large CSS file: ${file} (${sizeKB}KB)`);
    } else {
      console.log(`📦 Asset size: ${file} (${sizeKB}KB)`);
    }
  });
}

// Check index.html content
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for critical elements
  const criticalChecks = [
    { name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i },
    { name: 'Title tag', pattern: /<title>.*<\/title>/i },
    { name: 'Meta viewport', pattern: /<meta name="viewport"/i },
    { name: 'Meta description', pattern: /<meta name="description"/i },
    { name: 'CSS link', pattern: /<link.*\.css/i },
    { name: 'JS script', pattern: /<script.*\.js/i },
  ];
  
  criticalChecks.forEach(check => {
    if (check.pattern.test(indexContent)) {
      console.log(`✅ ${check.name} found in index.html`);
    } else {
      console.error(`❌ ${check.name} missing in index.html`);
      allFilesExist = false;
    }
  });
  
  // Check for accessibility features
  const accessibilityChecks = [
    { name: 'Lang attribute', pattern: /<html[^>]*lang=/i },
    { name: 'Skip link', pattern: /skip to main content/i },
    { name: 'Main landmark', pattern: /<main/i },
  ];
  
  accessibilityChecks.forEach(check => {
    if (check.pattern.test(indexContent)) {
      console.log(`♿ ${check.name} found`);
    } else {
      console.warn(`⚠️  ${check.name} missing (accessibility)`);
    }
  });
}

// Check deployment configuration files
const deploymentConfigs = [
  { file: 'netlify.toml', platform: 'Netlify' },
  { file: 'vercel.json', platform: 'Vercel' },
  { file: 'static.json', platform: 'Heroku' },
];

console.log('\n📋 Deployment configurations:');
deploymentConfigs.forEach(config => {
  const configPath = path.join(__dirname, '..', config.file);
  if (fs.existsSync(configPath)) {
    console.log(`✅ ${config.platform} config found: ${config.file}`);
  } else {
    console.log(`ℹ️  ${config.platform} config not found: ${config.file}`);
  }
});

// Check environment variables
console.log('\n🔧 Environment configuration:');
const envExample = path.join(__dirname, '..', '.env.example');
const envLocal = path.join(__dirname, '..', '.env.local');

if (fs.existsSync(envExample)) {
  console.log('✅ Environment template found: .env.example');
} else {
  console.warn('⚠️  Environment template missing: .env.example');
}

if (fs.existsSync(envLocal)) {
  console.log('✅ Local environment found: .env.local');
} else {
  console.log('ℹ️  Local environment not found: .env.local (optional)');
}

// Final validation result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 Deployment validation passed! Build is ready for deployment.');
  
  // Calculate total bundle size
  const totalSize = calculateTotalSize(distPath);
  console.log(`📊 Total bundle size: ${Math.round(totalSize / 1024)}KB`);
  
  if (totalSize > 1024 * 1024) { // 1MB
    console.warn('⚠️  Bundle size is large (>1MB). Consider code splitting.');
  }
  
  process.exit(0);
} else {
  console.error('❌ Deployment validation failed! Please fix the issues above.');
  process.exit(1);
}

function calculateTotalSize(dirPath) {
  let totalSize = 0;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        walkDir(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  }
  
  walkDir(dirPath);
  return totalSize;
}