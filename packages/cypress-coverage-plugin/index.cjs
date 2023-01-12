const COMMONJS_NYC_CONFIG = require('./src/constants/commonjs-nyc-config.cjs');
const patchTaskUtils = require('./src/patch-task-utils.cjs');

/*
`cypress-coverage-plugin` is required to be a CommonJS module, because it
  mutates the `@cypress/code-coverage/task-utils` module. TypeScript does not
  support such mutations.
*/

patchTaskUtils(COMMONJS_NYC_CONFIG);

const cypressCodeCoverageTask = require('@cypress/code-coverage/task');
module.exports = function cypressCoveragePlugin(on, config) {
  cypressCodeCoverageTask(on, config);
  return config;
};
