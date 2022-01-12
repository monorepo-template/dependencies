const { parse } = require('path');

module.exports = function mapPathToDir(path) {
  return parse(path).dir;
};
