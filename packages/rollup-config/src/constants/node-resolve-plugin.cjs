const { default: nodeResolve } = require('@rollup/plugin-node-resolve');

const NODE_RESOLVE_PLUGIN = nodeResolve({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  preferBuiltins: true,
});

module.exports = NODE_RESOLVE_PLUGIN;
