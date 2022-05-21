/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type {
  NextJsWebpackConfig,
  WebpackConfigContext,
} from 'next/dist/server/config-shared';
import type { Configuration as WebpackConfig } from 'webpack';
import type NextBabelConfigFunction from './types/next-babel-config-function';
import generateNextBabelWebpackConfig from './utils/generate-next-babel-webpack-config';

/*
We architect this as two separate functions instead of exposing
  `generateNextBabelWebpackConfig` directly so that we maintain a composable
  `NextJsWebpackConfig` function.

// Example `next.config.js`
export default {
  webpack: compose(
    configureBabel(babelConfig), // <--
    configureMyCustomApplication,
    configureYarnBerry,
  ),
};
*/

export default function configureNextBabel(
  nextBabelConfig: NextBabelConfigFunction,
): NextJsWebpackConfig {
  return function webpack(
    webpackConfig: Readonly<WebpackConfig>,
    webpackConfigContext: Readonly<WebpackConfigContext>,
  ): WebpackConfig {
    return generateNextBabelWebpackConfig(
      nextBabelConfig,
      webpackConfig,
      webpackConfigContext,
    );
  };
}
