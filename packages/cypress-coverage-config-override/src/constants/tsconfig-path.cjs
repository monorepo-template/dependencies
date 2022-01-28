const path = require('path');

const TSCONFIG_PATH = require.resolve(
  path.join(process.cwd(), 'tsconfig.cypress.json'),
);

module.exports = TSCONFIG_PATH;
