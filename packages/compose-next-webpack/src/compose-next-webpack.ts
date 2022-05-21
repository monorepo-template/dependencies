import type {
  NextJsWebpackConfig,
  WebpackConfigContext,
} from 'next/dist/server/config-shared';
import type { Configuration } from 'webpack';

export default function composeNextWebpack(
  ...nextWebpackConfigs: readonly NextJsWebpackConfig[]
): NextJsWebpackConfig {
  const reversedNextWebpackConfigs: readonly NextJsWebpackConfig[] = [
    ...nextWebpackConfigs,
  ].reverse();
  return function webpack(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: Readonly<Configuration>,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    options: Readonly<WebpackConfigContext>,
  ): Configuration {
    const reduce = (
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      newConfig: Readonly<Configuration>,
      nextWebpackConfig: NextJsWebpackConfig,
    ): Configuration => {
      // We use `as` here because `next` does not include the `webpack` types as
      //   a dependency. Its `NextJsWebpackConfig` function returns `any`
      //   instead of `Configuration`.
      return nextWebpackConfig(newConfig, options) as Configuration;
    };
    return reversedNextWebpackConfigs.reduce(reduce, config);
  };
}
