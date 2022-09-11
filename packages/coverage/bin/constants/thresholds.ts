import type { NYCThresholds } from 'nyc';
import BRANCHES_COVERAGE_THRESHOLD from '../constants/branches-coverage-threshold';
import FUNCTIONS_COVERAGE_THRESHOLD from '../constants/functions-coverage-threshold';
import LINES_COVERAGE_THRESHOLD from '../constants/lines-coverage-threshold';
import STATEMENTS_COVERAGE_THRESHOLD from '../constants/statements-coverage-threshold';

const THRESHOLDS: NYCThresholds = {
  branches: BRANCHES_COVERAGE_THRESHOLD,
  functions: FUNCTIONS_COVERAGE_THRESHOLD,
  lines: LINES_COVERAGE_THRESHOLD,
  statements: STATEMENTS_COVERAGE_THRESHOLD,
};

export default THRESHOLDS;
