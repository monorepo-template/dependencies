const COVERAGE_THRESHOLD = require('./constants/coverage-threshold.cjs');
const JEST_PRESET = require('./constants/jest-preset.cjs');

module.exports = {
  ...JEST_PRESET,
  coverageThreshold: COVERAGE_THRESHOLD,
};
