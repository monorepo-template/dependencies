import JEST_PRESET from '@monorepo-template/jest-preset';

export default function getCoverageThresholdPreset() {
  if (Object.prototype.hasOwnProperty.call(JEST_PRESET, 'coverageThreshold')) {
    return JEST_PRESET.coverageThreshold;
  }
  return Object.create(null);
}
