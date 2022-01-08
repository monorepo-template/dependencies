const JEST_PRESET = require('../constants/jest-preset.cjs');

const COLLECT_COVERAGE_FROM = [
  ...JEST_PRESET.collectCoverageFrom,
  '!<rootDir>/src/**/*.e2e.ts',
];

module.exports = COLLECT_COVERAGE_FROM;
