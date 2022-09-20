module.exports = {
  root: false,

  env: {
    jest: true,
    node: true,
  },

  overrides: [
    {
      files: ['src/test/types/deep-readonly.ts'],
      rules: {
        '@typescript-eslint/no-type-alias': 'off',
      },
    },
  ],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
