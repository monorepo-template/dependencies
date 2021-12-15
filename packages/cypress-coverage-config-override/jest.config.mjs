export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleFileExtensions: ['cjs', 'js', 'ts'],
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>'],

  collectCoverageFrom: [
    '<rootDir>/**/*',
    '!<rootDir>/.eslintrc.cjs',
    '!<rootDir>/jest/**/*',
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
