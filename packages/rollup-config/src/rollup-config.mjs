import IS_DEV from './constants/is-dev.mjs';
import OUTPUT from './constants/output.mjs';
import PLUGINS from './constants/plugins.mjs';
import WATCH from './constants/watch.mjs';
import external from './utils/external.mjs';

export default [
  {
    cache: true,
    external,
    input: 'src/index.ts',
    output: OUTPUT,
    plugins: PLUGINS,
    treeshake: !IS_DEV,
    watch: WATCH,
  },
];
