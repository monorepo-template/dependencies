import EXCLUDE from './constants/exclude';

export default {
  all: true,
  cache: true,
  'check-coverage': false,
  exclude: EXCLUDE,
  extension: ['.js', '.jsx', '.ts', '.tsx'],
  include: 'src/**',
  'report-dir': 'cypress/coverage',
  reporter: ['clover', 'json', 'lcov', 'text'],
  'skip-empty': false,
  'skip-full': false,
};
