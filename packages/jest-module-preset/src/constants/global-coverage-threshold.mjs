import GLOBAL_COVERAGE_THRESHOLD_PRESET from '../constants/global-coverage-threshold-preset.mjs';

const GLOBAL_COVERAGE_THRESHOLD = {
  ...GLOBAL_COVERAGE_THRESHOLD_PRESET,
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};

export default GLOBAL_COVERAGE_THRESHOLD;
