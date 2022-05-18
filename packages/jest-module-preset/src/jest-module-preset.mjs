import JEST_PRESET from '@monorepo-template/jest-preset';
import COVERAGE_THRESHOLD from './constants/coverage-threshold.mjs';

export default {
  ...JEST_PRESET,
  coverageThreshold: COVERAGE_THRESHOLD,
};
