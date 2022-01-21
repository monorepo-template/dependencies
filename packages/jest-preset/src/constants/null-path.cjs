const resolveRelative = require('../utils/resolve-relative.cjs');

const NULL_PATH = resolveRelative('src', 'constants', 'null.ts');

module.exports = NULL_PATH;
