import EXCLUDE from './constants/exclude.mjs';
import REPORT_DIR from './constants/report-dir.mjs';

export default {
  all: true,
  cache: true,
  'check-coverage': false,
  exclude: EXCLUDE,
  extension: ['.js', '.jsx', '.ts', '.tsx'],
  include: 'src/**',
  'report-dir': REPORT_DIR,
  reporter: ['clover', 'json', 'lcov', 'text'],
  'skip-empty': false,
  'skip-full': false,
};
