import type { Config } from 'jest';

const COVERAGE_REPORTERS: Required<Config>['coverageReporters'] = [
  'clover',
  'json',
  'lcov',
  [
    'text',
    {
      skipEmpty: true,
      skipFull: true,
    },
  ],
];

export default COVERAGE_REPORTERS;
