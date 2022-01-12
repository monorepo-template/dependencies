import IS_DEV from '../constants/is-dev.mjs';
import MAIN_DIR from '../constants/main-dir.mjs';

const COMMONJS_EXTENSION = 'cjs';

const OUTPUT_CJS = {
  chunkFileNames: `[name]-[hash].${COMMONJS_EXTENSION}`,
  dir: MAIN_DIR,
  entryFileNames: `[name].${COMMONJS_EXTENSION}`,
  exports: 'named',
  format: 'cjs',
  sourcemap: IS_DEV,
};

export default OUTPUT_CJS;
