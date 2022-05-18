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
      files: ['src/constants/transform.cjs'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
