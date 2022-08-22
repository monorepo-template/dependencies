import type { WebpackPluginInstance } from 'webpack';

/*
The Webpack TypeScript plugin instance must not be `readonly`, because we are
  going to mutate it.
*/

export default interface WebpackTypeScriptPluginInstance
  extends WebpackPluginInstance {
  tsconfig: string;
  options: {
    tsconfig: string;
  };
}
