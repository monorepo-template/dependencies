const COVERAGE_THRESHOLD_PRESET = require('../constants/coverage-threshold-preset.cjs');
const GLOBAL_COVERAGE_THRESHOLD = require('../constants/global-coverage-threshold.cjs');

const COVERAGE_THRESHOLD = {
  ...COVERAGE_THRESHOLD_PRESET,
  global: GLOBAL_COVERAGE_THRESHOLD,
};

module.exports = COVERAGE_THRESHOLD;
