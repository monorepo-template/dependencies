const EMPTY_STRING_PATH = require('./constants/empty-string-path.cjs');
const NULL_PATH = require('./constants/null-path.cjs');

const CSS_FILE = '(?<!\\.module)\\.(?:css|sass|scss)$';
const CSS_MODULE = '^.+\\.module\\.(?:css|sass|scss)$';
const IMAGE_FILE = '\\.(?:gif|jpg|png)$';

module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',

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

  moduleNameMapper: {
    [CSS_FILE]: NULL_PATH,
    [CSS_MODULE]: require.resolve('identity-obj-proxy'),
    [IMAGE_FILE]: EMPTY_STRING_PATH,
  },

  transform: {
    '^.+\\.tsx?$': require.resolve('@monorepo-template/jest-transformer'),
  },
};
