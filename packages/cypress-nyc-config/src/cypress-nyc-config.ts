import type { Options } from 'nyc';
import EXCLUDE from './constants/exclude';

export default {
  all: true,
  cache: true,
  // 'check-coverage': false,
  checkCoverage: false,
  exclude: EXCLUDE,
  extension: ['.js', '.jsx', '.ts', '.tsx'],
  include: 'src/**',
  // 'report-dir': 'cypress/coverage',
  reportDir: 'cypress/coverage',
  reporter: ['clover', 'json', 'lcov', 'text'],
  // 'skip-empty': true,
  skipEmpty: true,
  // 'skip-full': true,
  skipFull: true,
} satisfies Options;
