import EMPTY_STRING_PATH from './constants/empty-string-path.mjs';
import NULL_PATH from './constants/null-path.mjs';
import TRANSFORM from './constants/transform.mjs';
import requireResolve from './utils/require-resolve.mjs';

const CSS_FILE = '(?<!\\.module)\\.(?:css|sass|scss)$';
const CSS_MODULE = '^.+\\.module\\.(?:css|sass|scss)$';
const IMAGE_FILE = '\\.(?:gif|jpg|png)$';

export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: TRANSFORM,

  // Extends the default Jest configuration with `.cjs` and `.mjs` extensions.
  testMatch: [
    '**/__tests__/**/*.(cjs|js|jsx|mjs|ts|tsx)',
    '**/?(*.)+(spec|test).(cjs|js|jsx|mjs|ts|tsx)',
  ],

  collectCoverageFrom: [
    '<rootDir>/src/**/*.{cjs,jsx,jsx,mjs,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.e2e.ts',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
  ],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  moduleFileExtensions: [
    'cjs',
    'js',
    'json',
    'jsx',
    'mjs',
    'node',
    'ts',
    'tsx',
  ],

  moduleNameMapper: {
    [CSS_FILE]: NULL_PATH,
    [CSS_MODULE]: requireResolve('identity-obj-proxy'),
    [IMAGE_FILE]: EMPTY_STRING_PATH,
  },
};
