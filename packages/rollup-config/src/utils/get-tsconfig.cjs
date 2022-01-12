const { existsSync } = require('fs');
const IS_DEV = require('../constants/is-dev.cjs');
const TSCONFIG_DEV_PATH = require('../constants/tsconfig-dev-path.cjs');

module.exports = function getTSConfig() {
  if (IS_DEV && existsSync(TSCONFIG_DEV_PATH)) {
    return './tsconfig.development.json';
  }
  return './tsconfig.json';
};
