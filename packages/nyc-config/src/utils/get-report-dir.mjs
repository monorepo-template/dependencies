import MISSING_NYC_REPORT_DIR_ERROR from '../constants/missing-nyc-report-dir-error.mjs';

export default function getReportDir() {
  const reportDir = process.env.NYC_REPORT_DIR;

  if (!reportDir) {
    throw MISSING_NYC_REPORT_DIR_ERROR;
  }

  return reportDir;
}
