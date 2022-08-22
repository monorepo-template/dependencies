/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { Compiler, WebpackPluginInstance } from 'webpack';
import ABSOLUTE_TSCONFIG_PATH from '../constants/absolute-tsconfig-path';
import filterPluginByTypeScript from '../utils/filter-plugin-by-typescript';

/*
This function cannot receive a readonly plugin, because we are mutating the
  `WebpackPluginInstance` plugin.
*/

export default function mapPluginToCypressTSConfig(
  plugin:
    | WebpackPluginInstance
    | ((this: Readonly<Compiler>, compiler: Readonly<Compiler>) => void),
): WebpackPluginInstance | ((this: Compiler, compiler: Compiler) => void) {
  if (!filterPluginByTypeScript(plugin)) {
    return plugin;
  }

  // Since `plugin` is not a vanilla object, we cannot use the spread operator
  //   to simply make a new object.
  plugin.tsconfig = ABSOLUTE_TSCONFIG_PATH;
  plugin.options.tsconfig = ABSOLUTE_TSCONFIG_PATH;

  return plugin;
}
