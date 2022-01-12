import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import IS_DEV from '../constants/is-dev.mjs';
import TSCONFIG from '../constants/tsconfig.mjs';

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

export default PLUGINS;
