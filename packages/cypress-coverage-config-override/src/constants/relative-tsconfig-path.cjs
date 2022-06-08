const getRelativeTSConfigPath = require('../utils/get-relative-tsconfig-path.cjs');

const RELATIVE_TSCONFIG_PATH = getRelativeTSConfigPath();

module.exports = RELATIVE_TSCONFIG_PATH;
