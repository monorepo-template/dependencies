const { join } = require('path');

const TSCONFIG_DEV_PATH = join(process.cwd(), 'tsconfig.development.json');

module.exports = TSCONFIG_DEV_PATH;
