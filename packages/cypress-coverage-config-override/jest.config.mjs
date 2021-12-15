export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.cjs', '!<rootDir>/**/*.test.cjs'],
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', ['text', { skipFull: true }], 'clover'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
