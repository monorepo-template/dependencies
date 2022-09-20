import { PluginItem } from '@babel/core';
import requireResolve from '../utils/require-resolve';

const PRESET_ENV: PluginItem = [
  requireResolve('@babel/preset-env'),
  {
    targets: {
      node: 'current',
    },
  },
];

export default PRESET_ENV;
