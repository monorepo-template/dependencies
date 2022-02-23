import nodeResolve from '@rollup/plugin-node-resolve';

const NODE_RESOLVE_PLUGIN = nodeResolve.default({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  preferBuiltins: true,
});

export default NODE_RESOLVE_PLUGIN;
