const GLOBAL_COVERAGE_THRESHOLD_PRESET = require('../constants/global-coverage-threshold-preset.cjs');

const GLOBAL_COVERAGE_THRESHOLD = {
  ...GLOBAL_COVERAGE_THRESHOLD_PRESET,
  branches: 0,
  functions: 0,
  lines: 0,
  statements: 0,
};

module.exports = GLOBAL_COVERAGE_THRESHOLD;
