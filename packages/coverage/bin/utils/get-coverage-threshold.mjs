const DEFAULT_COVERAGE_THRESHOLD = 100;

export default function getCoverageThreshold(type) {
  const threshold = process.env[`${type}_COVERAGE_THRESHOLD`];
  if (typeof threshold === 'undefined') {
    return DEFAULT_COVERAGE_THRESHOLD;
  }
  return parseInt(threshold, 10);
}
