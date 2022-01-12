const commonjs = require('@rollup/plugin-commonjs');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript2 = require('rollup-plugin-typescript2');
const IS_DEV = require('../constants/is-dev.cjs');
const TSCONFIG = require('../constants/tsconfig.cjs');

const PLUGINS = [
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    preferBuiltins: true,
  }),

  commonjs({
    extensions: ['.js', '.jsx'],
  }),

  typescript2({
    check: !IS_DEV,
    tsconfig: TSCONFIG,
    useTsconfigDeclarationDir: true,
  }),
];

module.exports = PLUGINS;
