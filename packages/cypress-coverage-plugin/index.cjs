const COMMONJS_NYC_CONFIG = require('./src/constants/commonjs-nyc-config.cjs');
const patchTaskUtils = require('./src/patch-task-utils.cjs');
patchTaskUtils(COMMONJS_NYC_CONFIG);

const cypressCodeCoverageTask = require('@cypress/code-coverage/task');
module.exports = function cypressCoveragePlugin(on, config) {
  cypressCodeCoverageTask(on, config);
  return config;
};
