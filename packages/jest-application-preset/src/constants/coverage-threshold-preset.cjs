const getCoverageThresholdPreset = require('../utils/get-coverage-threshold-preset.cjs');

const COVERAGE_THRESHOLD_PRESET = getCoverageThresholdPreset();

module.exports = COVERAGE_THRESHOLD_PRESET;
