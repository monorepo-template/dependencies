module.exports = {
  root: false,

  env: {
    node: true,
  },

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['*.test.cjs', '*.test.mjs'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],

  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
};
