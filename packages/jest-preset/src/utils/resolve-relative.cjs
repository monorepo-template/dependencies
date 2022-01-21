const { resolve } = require('path');

module.exports = function resolveRelative(...paths) {
  return resolve(
    require.resolve('@monorepo-template/jest-preset'),
    '..',
    ...paths,
  );
};
