const DEFAULT_COVERAGE_THRESHOLD = 100;

export default function getCoverageThreshold(type: string): number {
  const threshold: string | undefined =
    process.env[`${type}_COVERAGE_THRESHOLD`];

  if (typeof threshold === 'undefined') {
    return DEFAULT_COVERAGE_THRESHOLD;
  }

  return parseInt(threshold, 10);
}
