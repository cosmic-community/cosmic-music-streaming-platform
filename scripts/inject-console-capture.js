const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${filePath}`);
    return;
  }
  
  const updatedContent = content.replace('</head>', `  ${scriptTag}\n</head>`);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`✓ Injected console capture script into ${filePath}`);
}

const outDir = path.join(__dirname, '..', '.next', 'server', 'app');

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log('Build output directory not found. Run build first.');
    return;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(outDir);
console.log('Console capture script injection complete!');