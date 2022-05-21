/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { describe, expect, it } from '@jest/globals';
import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration } from 'webpack';
import TEST_WEBPACK_CONFIG_CONTEXT from './test/constants/test-webpack-config-context';
import composeNextWebpack from '.';

const one = (
  config: Readonly<Configuration>,
  options: Readonly<WebpackConfigContext>,
): Configuration => ({
  ...config,
  dependencies: [options.buildId],
});

const two = (
  config: Readonly<Configuration>,
  options: Readonly<WebpackConfigContext>,
): Configuration => ({
  ...config,
  devtool: options.dir,
});

const TEST_WEBPACK_CONFIG: Configuration = {};

describe('composeNextWebpack', (): void => {
  it('should compose Next Webpack configs', (): void => {
    expect(
      composeNextWebpack(one, two)(
        TEST_WEBPACK_CONFIG,
        TEST_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual({
      dependencies: ['test-build-id'],
      devtool: 'test-dir',
    });
  });
});
