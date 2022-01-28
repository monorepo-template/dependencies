const path = require('path');

module.exports = function resolveRelative(...paths) {
  return path.resolve(
    require.resolve('@monorepo-template/jest-preset'),
    '..',
    ...paths,
  );
};
