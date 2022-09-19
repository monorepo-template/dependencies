import type { Configuration } from 'webpack';

const INVALID_BABEL_RULE_CONFIG: Configuration = {
  plugins: [],
  module: {
    rules: [
      '...',
      {
        oneOf: [
          {},
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};

export default INVALID_BABEL_RULE_CONFIG;
