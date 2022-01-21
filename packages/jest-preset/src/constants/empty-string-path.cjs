const resolveRelative = require('../utils/resolve-relative.cjs');

const EMPTY_STRING_PATH = resolveRelative(
  'src',
  'constants',
  'empty-string.ts',
);

module.exports = EMPTY_STRING_PATH;
