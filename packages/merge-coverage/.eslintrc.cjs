module.exports = {
  root: false,

  env: {
    node: true,
  },

  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
