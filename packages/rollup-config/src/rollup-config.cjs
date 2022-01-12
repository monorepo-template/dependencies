const IS_DEV = require('./constants/is-dev.cjs');
const OUTPUT = require('./constants/output.cjs');
const PLUGINS = require('./constants/plugins.cjs');
const WATCH = require('./constants/watch.cjs');
const external = require('./utils/external.cjs');

module.exports = [
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
