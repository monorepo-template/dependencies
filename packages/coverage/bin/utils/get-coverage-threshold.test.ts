/// <reference types="jest" />
import getCoverageThreshold from './get-coverage-threshold';

const DEFAULT_COVERAGE_THRESHOLD = 100;
const TEST_COVERAGE_THRESHOLD = 75;

describe('getCoverageThreshold', (): void => {
  describe('with environment variables', (): void => {
    beforeEach((): void => {
      process.env.TEST_COVERAGE_THRESHOLD = `${TEST_COVERAGE_THRESHOLD}`;
    });

    afterEach((): void => {
      delete process.env.TEST_COVERAGE_THRESHOLD;
    });

    it('should respect environment variables', (): void => {
      expect(getCoverageThreshold('TEST')).toBe(TEST_COVERAGE_THRESHOLD);
    });
  });

  it('should default to 100', (): void => {
    expect(getCoverageThreshold('TEST')).toBe(DEFAULT_COVERAGE_THRESHOLD);
  });
});
