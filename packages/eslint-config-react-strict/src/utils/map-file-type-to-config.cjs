const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = function mapFileTypeToConfig(type) {
  const path = join(__dirname, '..', '..', 'rules', `${type}.json`);
  const configStr = readFileSync(path, 'utf8');
  const configJson = JSON.parse(configStr);
  return configJson;
};
