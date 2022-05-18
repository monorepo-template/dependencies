import JEST_PRESET from '@monorepo-template/jest-preset';
import COLLECT_COVERAGE_FROM from './constants/collect-coverage-from.mjs';
import COVERAGE_THRESHOLD from './constants/coverage-threshold.mjs';

export default {
  ...JEST_PRESET,
  collectCoverageFrom: COLLECT_COVERAGE_FROM,
  coverageThreshold: COVERAGE_THRESHOLD,
  testEnvironment: 'jsdom',
};
