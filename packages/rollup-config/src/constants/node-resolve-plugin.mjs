import nodeResolve from '@rollup/plugin-node-resolve';

const NODE_RESOLVE_PLUGIN = nodeResolve({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  preferBuiltins: true,
});

export default NODE_RESOLVE_PLUGIN;
