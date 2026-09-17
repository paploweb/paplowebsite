const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

console.log('🚀 Starting production build for Netlify...');

// Ensure clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy index.html
fs.copyFileSync(path.join(srcDir, 'index.html'), path.join(distDir, 'index.html'));
console.log('✓ Copied index.html');

// Copy assets directory recursively
const assetsSrc = path.join(srcDir, 'assets');
const assetsDist = path.join(distDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDist, { recursive: true });
  console.log('✓ Copied assets directory');
}

// Copy _redirects file
const redirectsSrc = path.join(srcDir, '_redirects');
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, path.join(distDir, '_redirects'));
  console.log('✓ Copied _redirects');
} else {
  fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200\n');
  console.log('✓ Created _redirects in dist');
}

console.log('✨ Production build completed successfully! Output folder: dist');