const MISSING_NYC_REPORT_DIR_ERROR = require('../constants/missing-nyc-report-dir-error.cjs');

module.exports = function getReportDir() {
  const reportDir = process.env.NYC_REPORT_DIR;

  if (!reportDir) {
    throw MISSING_NYC_REPORT_DIR_ERROR;
  }

  return reportDir;
};
