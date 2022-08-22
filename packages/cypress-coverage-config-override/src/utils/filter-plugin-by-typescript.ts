import type { Compiler, WebpackPluginInstance } from 'webpack';
import type WebpackTypeScriptPluginInstance from '../types/webpack-typescript-plugin-instance';
import filterByRecord from './filter-by-record';
import hasKey from './has-key';

export default function filterPluginByTypeScript(
  plugin:
    | Readonly<WebpackPluginInstance>
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    | ((this: Readonly<Compiler>, compiler: Readonly<Compiler>) => void),
): plugin is WebpackTypeScriptPluginInstance {
  if (
    typeof plugin !== 'object' ||
    !hasKey(plugin, 'options') ||
    !hasKey(plugin, 'tsconfig')
  ) {
    return false;
  }

  const { options } = plugin;
  return (
    filterByRecord(options) &&
    Object.prototype.hasOwnProperty.call(options, 'tsconfig')
  );
}
