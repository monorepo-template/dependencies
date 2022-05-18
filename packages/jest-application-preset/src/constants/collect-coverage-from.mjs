import JEST_PRESET from '@monorepo-template/jest-preset';

const COLLECT_COVERAGE_FROM = [
  ...JEST_PRESET.collectCoverageFrom,
  '!<rootDir>/src/**/*.e2e.ts',
];

export default COLLECT_COVERAGE_FROM;
