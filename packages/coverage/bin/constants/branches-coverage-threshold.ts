import getCoverageThreshold from '../utils/get-coverage-threshold';

const BRANCHES_COVERAGE_THRESHOLD: number | undefined =
  getCoverageThreshold('BRANCHES');

export default BRANCHES_COVERAGE_THRESHOLD;
