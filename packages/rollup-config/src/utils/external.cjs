const EXTERNAL_DEPENDENCIES_SET = require('../constants/external-dependencies-set.cjs');

module.exports = function external(id) {
  if (EXTERNAL_DEPENDENCIES_SET.has(id)) {
    return true;
  }

  for (const pkg of EXTERNAL_DEPENDENCIES_SET) {
    if (id.startsWith(`${pkg}/`)) {
      return true;
    }
  }

  return false;
};
