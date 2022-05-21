import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration as WebpackConfig } from 'webpack';
import type NextBabelConfigFunction from '../types/next-babel-config-function';
import BabelWebpackConfig from '../utils/babel-webpack-config';

export default function generateNextBabelWebpackConfig(
  nextBabelConfig: NextBabelConfigFunction,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  webpackConfig: Readonly<WebpackConfig>,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  webpackConfigContext: Readonly<WebpackConfigContext>,
): WebpackConfig {
  const babelOptions: Readonly<Record<string, unknown>> | undefined =
    nextBabelConfig(webpackConfigContext);
  if (typeof babelOptions === 'undefined') {
    return webpackConfig;
  }
  return new BabelWebpackConfig(
    webpackConfig,
    webpackConfigContext,
    babelOptions,
  ).toJSON();
}
