require('@babel/register')({
  babelrc: true,
  cache: false,
  configFile: './babel.config.rollup.json',
  extensions: ['.ts'],
});

module.exports = require('./src/index.ts').default;
