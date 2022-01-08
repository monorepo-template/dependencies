const COLLECT_COVERAGE_FROM = require('./constants/collect-coverage-from.cjs');
const COVERAGE_THRESHOLD = require('./constants/coverage-threshold.cjs');
const JEST_PRESET = require('./constants/jest-preset.cjs');

module.exports = {
  ...JEST_PRESET,
  collectCoverageFrom: COLLECT_COVERAGE_FROM,
  coverageThreshold: COVERAGE_THRESHOLD,
};
