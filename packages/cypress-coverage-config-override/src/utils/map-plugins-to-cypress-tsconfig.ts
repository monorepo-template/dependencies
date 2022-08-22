/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { Compiler, WebpackPluginInstance } from 'webpack';
import mapPluginToCypressTSConfig from './map-plugin-to-cypress-tsconfig';

/*
This function cannot receive a readonly option, because we are mutating one of
  the `WebpackPluginInstance` objects.
*/

export default function mapPluginsToCypressTSConfig(
  plugins: readonly (
    | WebpackPluginInstance
    | ((this: Readonly<Compiler>, compiler: Readonly<Compiler>) => void)
  )[],
): (WebpackPluginInstance | ((this: Compiler, compiler: Compiler) => void))[] {
  return plugins.map(mapPluginToCypressTSConfig);
}
