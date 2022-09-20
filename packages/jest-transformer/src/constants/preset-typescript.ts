import { PluginItem } from '@babel/core';
import requireResolve from '../utils/require-resolve';

const PRESET_TYPESCRIPT: PluginItem = requireResolve(
  '@babel/preset-typescript',
);

export default PRESET_TYPESCRIPT;
