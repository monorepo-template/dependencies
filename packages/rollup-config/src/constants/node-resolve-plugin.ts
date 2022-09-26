import nodeResolve from '@rollup/plugin-node-resolve';
import type { Plugin } from 'rollup';

const NODE_RESOLVE_PLUGIN: Plugin = nodeResolve({
  extensions: ['.cjs', '.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
  preferBuiltins: true,
});

export default NODE_RESOLVE_PLUGIN;
