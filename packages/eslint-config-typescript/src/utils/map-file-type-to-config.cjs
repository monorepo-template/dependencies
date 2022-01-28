const { readFileSync } = require('fs');
const path = require('path');

module.exports = function mapFileTypeToConfig(type) {
  const configPath = path.join(__dirname, '..', '..', 'rules', `${type}.json`);
  const configStr = readFileSync(configPath, 'utf8');
  const configJson = JSON.parse(configStr);
  return configJson;
};
