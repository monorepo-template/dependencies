import commonjs from '@rollup/plugin-commonjs';
import type { Plugin } from 'rollup';

const COMMONJS_PLUGIN: Plugin = commonjs({
  extensions: ['.js', '.jsx'],
});

export default COMMONJS_PLUGIN;
