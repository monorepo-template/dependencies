import getCoverageThreshold from '../utils/get-coverage-threshold';

const STATEMENTS_COVERAGE_THRESHOLD: number | undefined =
  getCoverageThreshold('STATEMENTS');

export default STATEMENTS_COVERAGE_THRESHOLD;
