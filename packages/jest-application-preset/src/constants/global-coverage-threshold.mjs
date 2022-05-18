import GLOBAL_COVERAGE_THRESHOLD_PRESET from '../constants/global-coverage-threshold-preset.mjs';

const GLOBAL_COVERAGE_THRESHOLD = {
  ...GLOBAL_COVERAGE_THRESHOLD_PRESET,
  branches: 0,
  functions: 0,
  lines: 0,
  statements: 0,
};

export default GLOBAL_COVERAGE_THRESHOLD;
