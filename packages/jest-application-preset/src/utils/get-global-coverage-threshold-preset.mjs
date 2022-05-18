import COVERAGE_THRESHOLD_PRESET from '../constants/coverage-threshold-preset.mjs';

export default function getGlobalCoverageThresholdPreset() {
  if (
    Object.prototype.hasOwnProperty.call(COVERAGE_THRESHOLD_PRESET, 'global')
  ) {
    return COVERAGE_THRESHOLD_PRESET.global;
  }
  return Object.create(null);
}
