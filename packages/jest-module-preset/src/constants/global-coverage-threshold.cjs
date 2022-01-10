const GLOBAL_COVERAGE_THRESHOLD_PRESET = require('../constants/global-coverage-threshold-preset.cjs');

const GLOBAL_COVERAGE_THRESHOLD = {
  ...GLOBAL_COVERAGE_THRESHOLD_PRESET,
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};

module.exports = GLOBAL_COVERAGE_THRESHOLD;
