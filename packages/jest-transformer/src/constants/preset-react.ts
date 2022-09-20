import type { PluginItem } from '@babel/core';
import requireResolve from '../utils/require-resolve';

const PRESET_REACT: PluginItem = [
  requireResolve('@babel/preset-react'),
  {
    runtime: 'automatic',
  },
];

export default PRESET_REACT;
