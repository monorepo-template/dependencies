require('@babel/register')({
  babelrc: true,
  cache: false,
  configFile: './babel.config.json',
  extensions: ['.ts'],
});

const { default: RollupConfig } = require('./src/utils/rollup-config.ts');

module.exports = [
  // `@monorepo-template/rollup-config`
  new RollupConfig()
    .disableJsxRuntime()
    .setTSConfigPath('./tsconfig.rollup.json')
    .toJSON(),

  // `@monorepo-template/rollup-config/new`
  new RollupConfig()
    .disableJsxRuntime()
    .addInput('new', './src/utils/rollup-config.ts')
    .setTSConfigPath('./tsconfig.rollup.json')
    .toJSON(),
];
