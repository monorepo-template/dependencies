const JEST_PRESET = require('../constants/jest-preset.cjs');

const COVERAGE_THRESHOLD = {
  ...JEST_PRESET.coverageThreshold,
  global: {
    ...JEST_PRESET.coverageThreshold?.global,
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
};

module.exports = COVERAGE_THRESHOLD;
