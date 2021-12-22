import BRANCHES_COVERAGE_THRESHOLD from '../constants/branches-coverage-threshold.mjs';
import FUNCTIONS_COVERAGE_THRESHOLD from '../constants/functions-coverage-threshold.mjs';
import LINES_COVERAGE_THRESHOLD from '../constants/lines-coverage-threshold.mjs';
import STATEMENTS_COVERAGE_THRESHOLD from '../constants/statements-coverage-threshold.mjs';

const THRESHOLDS = {
  branches: BRANCHES_COVERAGE_THRESHOLD,
  functions: FUNCTIONS_COVERAGE_THRESHOLD,
  lines: LINES_COVERAGE_THRESHOLD,
  statements: STATEMENTS_COVERAGE_THRESHOLD,
};

export default THRESHOLDS;
