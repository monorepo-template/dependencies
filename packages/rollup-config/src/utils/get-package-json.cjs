const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = function getPackageJson() {
  const path = join(process.cwd(), 'package.json');
  const str = readFileSync(path, 'utf8');
  return JSON.parse(str);
};
