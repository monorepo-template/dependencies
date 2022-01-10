const getGlobalCoverageThresholdPreset = require('../utils/get-global-coverage-threshold-preset.cjs');

const GLOBAL_COVERAGE_THRESHOLD_PRESET = getGlobalCoverageThresholdPreset();

module.exports = GLOBAL_COVERAGE_THRESHOLD_PRESET;
