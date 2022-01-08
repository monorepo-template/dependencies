const JEST_PRESET = require('../constants/jest-preset.cjs');

const COVERAGE_THRESHOLD = {
  ...JEST_PRESET.coverageThreshold,
  global: {
    ...JEST_PRESET.coverageThreshold?.global,
    branches: 0,
    functions: 0,
    lines: 0,
    statements: 0,
  },
};

module.exports = COVERAGE_THRESHOLD;
