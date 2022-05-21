import type { RuleSetRule } from 'webpack';

const NON_BABEL_RULES: readonly (RuleSetRule | '...')[] = [
  '...',

  {
    // We use `as` here because `webpack` does not use
    //   `exactOptionalPropertyTypes` for its TypeScript definitions.
    oneOf: undefined as unknown as RuleSetRule[],
  },

  {
    oneOf: [
      {
        use: 'test-loader',
      },

      {
        use: ['test-loader'],
      },

      {
        use: {
          // We use `as` here because `webpack` does not use
          //   `exactOptionalPropertyTypes` for its TypeScript definitions.
          loader: undefined as unknown as string,
        },
      },

      {
        use: {
          loader: 'text-loader',
        },
      },

      {
        use: {
          loader: 'next-swc-loader',
        },
      },
    ],
  },
];

export default NON_BABEL_RULES;
