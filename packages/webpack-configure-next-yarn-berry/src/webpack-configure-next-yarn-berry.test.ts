/// <reference types="jest" />
import type {
  NextConfigComplete,
  WebpackConfigContext,
} from 'next/dist/server/config-shared';
import YARN_BERRY_RULE_TEST from './constants/yarn-berry-rule-test';
import yarnBerryRuleInclude from './utils/yarn-berry-rule-include';
import configureNextYarnBerry from '.';
import type { RuleSetRule } from 'webpack';

const TEST_BABEL_LOADER = 'test-babel-loader';

const EXPECTED_RULE: RuleSetRule = {
  include: yarnBerryRuleInclude,
  test: YARN_BERRY_RULE_TEST,
  use: TEST_BABEL_LOADER,
};

const TEST_NEXT_CONFIG_COMPLETE: NextConfigComplete = {
  amp: {},
  analyticsId: 'test-analytics-id',
  assetPrefix: 'test-asset-prefix',
  basePath: 'test-base-path',
  cleanDistDir: false,
  compiler: {},
  compress: false,
  configFileName: 'test-config-file-name',
  crossOrigin: false,
  excludeDefaultMomentLocales: true,
  experimental: {},
  exportPathMap: jest.fn(),
  devIndicators: {},
  distDir: 'test-dist-dir',
  env: {},
  eslint: {},
  future: {},
  generateEtags: false,
  httpAgentOptions: {},
  i18n: null,
  onDemandEntries: {},
  optimizeFonts: false,
  output: 'standalone',
  outputFileTracing: false,
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: {},
  reactStrictMode: true,
  pageExtensions: [],
  poweredByHeader: false,
  sassOptions: {},
  serverRuntimeConfig: {},
  staticPageGenerationTimeout: 0,
  swcMinify: false,
  trailingSlash: true,
  useFileSystemPublicRoutes: false,
  webpack: null,
  webpack5: false,
  images: {
    contentSecurityPolicy: 'test-content-security-policy',
    dangerouslyAllowSVG: false,
    deviceSizes: [],
    disableStaticImages: false,
    domains: [],
    formats: [],
    imageSizes: [],
    loader: 'default',
    minimumCacheTTL: 0,
    path: 'test-path',
  },
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: 'test-tsconfig-path',
  },
  generateBuildId(): null {
    return null;
  },
  async headers(): Promise<never[]> {
    return Promise.resolve([]);
  },
  async rewrites(): Promise<never[]> {
    return Promise.resolve([]);
  },
  async redirects(): Promise<never[]> {
    return Promise.resolve([]);
  },
};

const TEST_WEBPACK_CONFIG_CONTEXT: WebpackConfigContext = {
  buildId: 'test-build-id',
  config: TEST_NEXT_CONFIG_COMPLETE,
  dev: true,
  dir: 'test-dir',
  isServer: true,
  totalPages: 1,
  webpack: null,
  defaultLoaders: {
    babel: TEST_BABEL_LOADER,
  },
};

describe('configureNextYarnBerry', (): void => {
  it('should support Webpack configurations with no module options', (): void => {
    expect(configureNextYarnBerry({}, TEST_WEBPACK_CONFIG_CONTEXT)).toEqual({
      module: {
        rules: [EXPECTED_RULE],
      },
    });
  });

  it('should support Webpack configurations with no module rules', (): void => {
    expect(
      configureNextYarnBerry(
        {
          module: {},
        },
        TEST_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual({
      module: {
        rules: [EXPECTED_RULE],
      },
    });
  });

  it('should support Webpack configurations with module rules', (): void => {
    const TEST_RULE: RuleSetRule = {
      test: 'test-test',
      use: 'test-use',
    };
    expect(
      configureNextYarnBerry(
        {
          module: {
            rules: [TEST_RULE],
          },
        },
        TEST_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual({
      module: {
        rules: [TEST_RULE, EXPECTED_RULE],
      },
    });
  });
});
