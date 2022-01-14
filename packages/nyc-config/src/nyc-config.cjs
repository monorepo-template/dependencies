const EXCLUDE = require('./constants/exclude.cjs');
const REPORT_DIR = require('./constants/report-dir.cjs');

module.exports = {
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
