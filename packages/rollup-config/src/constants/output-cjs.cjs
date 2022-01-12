const IS_DEV = require('../constants/is-dev.cjs');
const MAIN_DIR = require('../constants/main-dir.cjs');

const COMMONJS_EXTENSION = 'cjs';

const OUTPUT_CJS = {
  chunkFileNames: `[name]-[hash].${COMMONJS_EXTENSION}`,
  dir: MAIN_DIR,
  entryFileNames: `[name].${COMMONJS_EXTENSION}`,
  exports: 'named',
  format: 'cjs',
  sourcemap: IS_DEV,
};

module.exports = OUTPUT_CJS;
