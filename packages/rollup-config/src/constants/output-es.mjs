import IS_DEV from '../constants/is-dev.mjs';
import MODULE_DIR from '../constants/module-dir.mjs';

const ESM_EXTENSION = 'js';

const OUTPUT_ES = {
  chunkFileNames: `[name]-[hash].${ESM_EXTENSION}`,
  dir: MODULE_DIR,
  entryFileNames: `[name].${ESM_EXTENSION}`,
  format: 'es',
  sourcemap: IS_DEV,
};

export default OUTPUT_ES;
