const COVERAGE_THRESHOLD_PRESET = require('../constants/coverage-threshold-preset.cjs');

module.exports = function getGlobalCoverageThresholdPreset() {
  if (
    Object.prototype.hasOwnProperty.call(COVERAGE_THRESHOLD_PRESET, 'global')
  ) {
    return COVERAGE_THRESHOLD_PRESET.global;
  }
  return Object.create(null);
};
