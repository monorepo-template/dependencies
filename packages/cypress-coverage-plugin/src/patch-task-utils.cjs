const taskUtils = require('@cypress/code-coverage/task-utils');

const taskUtilsReadNycOptions = taskUtils.readNycOptions;

module.exports = function patchTaskUtils(config = {}) {
  taskUtils.readNycOptions = (...args) => {
    return {
      ...taskUtilsReadNycOptions(...args),
      ...require('@monorepo-template/cypress-nyc-config'),
      ...config,
    };
  };
};
