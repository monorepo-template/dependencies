import commonjs from '@rollup/plugin-commonjs';

const COMMONJS_PLUGIN = commonjs({
  extensions: ['.js', '.jsx'],
});

export default COMMONJS_PLUGIN;
