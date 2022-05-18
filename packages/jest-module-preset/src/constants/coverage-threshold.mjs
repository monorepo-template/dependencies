import COVERAGE_THRESHOLD_PRESET from '../constants/coverage-threshold-preset.mjs';
import GLOBAL_COVERAGE_THRESHOLD from '../constants/global-coverage-threshold.mjs';

const COVERAGE_THRESHOLD = {
  ...COVERAGE_THRESHOLD_PRESET,
  global: GLOBAL_COVERAGE_THRESHOLD,
};

export default COVERAGE_THRESHOLD;
