import type { Config } from 'jest';

const COVERAGE_REPORTERS: Required<Config>['coverageReporters'] = [
  'clover',
  'json',
  'lcov',
  [
    'text',
    {
      skipFull: true,
    },
  ],
];

export default COVERAGE_REPORTERS;
