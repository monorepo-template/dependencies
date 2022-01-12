const IS_DEV = require('../constants/is-dev.cjs');
const MODULE_DIR = require('../constants/module-dir.cjs');

const ESM_EXTENSION = 'js';

const OUTPUT_ES = {
  chunkFileNames: `[name]-[hash].${ESM_EXTENSION}`,
  dir: MODULE_DIR,
  entryFileNames: `[name].${ESM_EXTENSION}`,
  format: 'es',
  sourcemap: IS_DEV,
};

module.exports = OUTPUT_ES;
