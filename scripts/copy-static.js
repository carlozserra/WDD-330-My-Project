const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const staticPaths = [
  { src: path.join(root, 'converter.html'), dest: path.join(dist, 'converter.html') },
  { src: path.join(root, 'country.html'), dest: path.join(dist, 'country.html') },
  { src: path.join(root, 'index.html'), dest: path.join(dist, 'index.html') },
  { src: path.join(root, 'css'), dest: path.join(dist, 'css') },
  { src: path.join(root, 'js'), dest: path.join(dist, 'js') },
  { src: path.join(root, 'images'), dest: path.join(dist, 'images') },
  { src: path.join(root, 'partials'), dest: path.join(dist, 'partials') }
];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (const item of staticPaths) {
  if (fs.existsSync(item.src)) {
    if (fs.statSync(item.src).isDirectory()) {
      copyDir(item.src, item.dest);
    } else {
      fs.copyFileSync(item.src, item.dest);
    }
  }
}

console.log('Static files copied to dist.');
