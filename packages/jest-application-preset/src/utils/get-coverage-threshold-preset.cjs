const JEST_PRESET = require('../constants/jest-preset.cjs');

module.exports = function getCoverageThresholdPreset() {
  if (Object.prototype.hasOwnProperty.call(JEST_PRESET, 'coverageThreshold')) {
    return JEST_PRESET.coverageThreshold;
  }
  return Object.create(null);
};
