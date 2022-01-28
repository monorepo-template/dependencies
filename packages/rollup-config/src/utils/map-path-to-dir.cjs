const path = require('path');

module.exports = function mapPathToDir(filePath) {
  return path.parse(filePath).dir;
};
