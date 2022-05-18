module.exports = {
  root: false,

  env: {
    node: true,
  },

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
};
