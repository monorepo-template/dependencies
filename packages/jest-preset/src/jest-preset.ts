import type { Config } from 'jest';
import COVERAGE_REPORTERS from './constants/coverage-reporters';
import EMPTY_STRING_PATH from './constants/empty-string-path';
import NULL_PATH from './constants/null-path';
import TRANSFORM from './constants/transform';
import requireResolve from './utils/require-resolve';

const CSS_FILE_PATH = '(?<!\\.module)\\.(?:css|sass|scss)$';
const CSS_MODULE_PATH = '^.+\\.module\\.(?:css|sass|scss)$';
const IMAGE_FILE_PATH = '\\.(?:gif|jpe?g|png)$';

const JEST_PRESET: Config = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: COVERAGE_REPORTERS,
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
    [CSS_FILE_PATH]: NULL_PATH,
    [CSS_MODULE_PATH]: requireResolve('identity-obj-proxy'),
    [IMAGE_FILE_PATH]: EMPTY_STRING_PATH,
  },
};

export default JEST_PRESET;
