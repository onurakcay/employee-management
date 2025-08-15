import {readFileSync, writeFileSync} from 'fs';

// Read the source index.html
const indexPath = 'dist/index.html';
let content = readFileSync(indexPath, 'utf8');

// Replace my-element.js with my-element.bundled.js
content = content.replace(/my-element\.js/g, 'my-element.bundled.js');

// Write back the updated content
writeFileSync(indexPath, content);

console.log('✅ Updated script reference in index.html for production');
