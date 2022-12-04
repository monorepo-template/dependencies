/// <reference types="jest" />
import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration } from 'webpack';
import composeNextWebpack from '.';
import TEST_WEBPACK_CONFIG_CONTEXT from './test/constants/test-webpack-config-context';
import type DeepReadonly from './test/types/deep-readonly';

const one = (
  config: DeepReadonly<Configuration>,
  options: DeepReadonly<WebpackConfigContext>,
): DeepReadonly<Configuration> => ({
  ...config,
  dependencies: [options.buildId],
});

const two = (
  config: DeepReadonly<Configuration>,
  options: DeepReadonly<WebpackConfigContext>,
): DeepReadonly<Configuration> => ({
  ...config,
  devtool: options.dir,
});

const TEST_WEBPACK_CONFIG: Configuration = {
  bail: true,
};

describe('composeNextWebpack', (): void => {
  it('should compose Next Webpack configs', (): void => {
    expect(
      composeNextWebpack(one, two)(
        TEST_WEBPACK_CONFIG,
        TEST_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual({
      bail: true,
      dependencies: ['test-build-id'],
      devtool: 'test-dir',
    });
  });
});
