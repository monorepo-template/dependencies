import type { Configuration } from 'webpack';

const MISSING_ONE_OF_BABEL_RULE_CONFIG: Configuration = {
  plugins: [],
  module: {
    rules: [{}],
  },
};

export default MISSING_ONE_OF_BABEL_RULE_CONFIG;
