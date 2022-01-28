const { readFileSync } = require('fs');
const path = require('path');

module.exports = function getPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const str = readFileSync(packagePath, 'utf8');
  return JSON.parse(str);
};
