import getCoverageThreshold from '../utils/get-coverage-threshold';

const LINES_COVERAGE_THRESHOLD: number | undefined =
  getCoverageThreshold('LINES');

export default LINES_COVERAGE_THRESHOLD;
