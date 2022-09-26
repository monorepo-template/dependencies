/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { Plugin } from 'rollup';

export default function reducePluginsFunctionsToPlugins(
  plugins: readonly Readonly<Plugin>[],
  pluginsFunction: (plugins: readonly Readonly<Plugin>[]) => Plugin[],
): Plugin[] {
  return pluginsFunction(plugins);
}
