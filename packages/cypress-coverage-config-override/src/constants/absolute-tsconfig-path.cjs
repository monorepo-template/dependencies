const path = require('path');
const RELATIVE_TSCONFIG_PATH = require('./relative-tsconfig-path.cjs');

const ABSOLUTE_TSCONFIG_PATH = require.resolve(
  path.join(process.cwd(), RELATIVE_TSCONFIG_PATH),
);

module.exports = ABSOLUTE_TSCONFIG_PATH;
