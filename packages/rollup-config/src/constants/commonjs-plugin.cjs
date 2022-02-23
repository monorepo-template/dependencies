const commonjs = require('@rollup/plugin-commonjs');

const COMMONJS_PLUGIN = commonjs({
  extensions: ['.js', '.jsx'],
});

module.exports = COMMONJS_PLUGIN;
