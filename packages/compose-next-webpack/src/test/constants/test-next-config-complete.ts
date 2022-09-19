import type { NextConfigComplete } from 'next/dist/server/config-shared';
import asyncArray from '../utils/async-array';
import returnEmpty from '../utils/return-empty';
import returnNull from '../utils/return-null';

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
  exportPathMap: returnEmpty,
  devIndicators: {},
  distDir: 'test-dist-dir',
  env: {},
  eslint: {},
  future: {},
  generateBuildId: returnNull,
  generateEtags: false,
  headers: asyncArray,
  httpAgentOptions: {},
  i18n: null,
  onDemandEntries: {},
  optimizeFonts: false,
  output: 'standalone',
  outputFileTracing: false,
  productionBrowserSourceMaps: false,
  publicRuntimeConfig: {},
  reactStrictMode: true,
  redirects: asyncArray,
  rewrites: asyncArray,
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
