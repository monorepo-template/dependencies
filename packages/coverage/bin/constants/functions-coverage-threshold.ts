import getCoverageThreshold from '../utils/get-coverage-threshold';

const FUNCTIONS_COVERAGE_THRESHOLD: number | undefined =
  getCoverageThreshold('FUNCTIONS');

export default FUNCTIONS_COVERAGE_THRESHOLD;
