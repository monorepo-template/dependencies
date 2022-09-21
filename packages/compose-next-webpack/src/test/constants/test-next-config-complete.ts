import type { NextConfigComplete } from 'next/dist/server/config-shared';

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
  generateBuildId: jest.fn(),
  generateEtags: false,
  headers: jest.fn(),
  httpAgentOptions: {},
  i18n: null,
  onDemandEntries: {},
  optimizeFonts: false,
  output: 'standalone',
  outputFileTracing: false,
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: {},
  reactStrictMode: true,
  redirects: jest.fn(),
  rewrites: jest.fn(),
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
};

export default TEST_NEXT_CONFIG_COMPLETE;
