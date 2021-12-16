export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['cjs', 'js', 'mjs', 'ts'],
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>'],

  collectCoverageFrom: [
    '<rootDir>/**/*',
    '!<rootDir>/jest/**/*',
    '!<rootDir>/.eslintrc.cjs',
    '!<rootDir>/**/*.d.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
