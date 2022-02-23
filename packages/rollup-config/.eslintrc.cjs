module.exports = {
  root: false,

  env: {
    jest: true,
    node: true,
  },

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
};
