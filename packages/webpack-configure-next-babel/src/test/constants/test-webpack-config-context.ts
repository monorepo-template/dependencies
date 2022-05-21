import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import TEST_NEXT_CONFIG_COMPLETE from '../constants/test-next-config-complete';

const TEST_WEBPACK_CONFIG_CONTEXT: Omit<WebpackConfigContext, 'dev'> = {
  buildId: 'test-build-id',
  config: TEST_NEXT_CONFIG_COMPLETE,
  dir: 'test-dir',
  isServer: true,
  totalPages: 1,
  webpack: null,
  defaultLoaders: {
    babel: 'test-babel-loader',
  },
};

export default TEST_WEBPACK_CONFIG_CONTEXT;
