const fs = require('fs');
const path = require('path');

const postcssPaths = [
  path.join(__dirname, 'node_modules', 'postcss', 'package.json'),
  path.join(__dirname, 'node_modules', 'next', 'node_modules', 'postcss', 'package.json'),
];

for (const pkgPath of postcssPaths) {
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.exports && !pkg.exports['./lib/*']) {
      pkg.exports['./lib/*'] = './lib/*.js';
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log('Patched postcss exports:', pkgPath);
    }
  }
}
