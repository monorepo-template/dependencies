import RollupConfig from '@monorepo-template/rollup-config/new';

export default [
  // bin
  new RollupConfig()
    .addInput('index', 'bin/coverage.ts')
    .setCjsDirectory(null)
    .setEsmDirectory('./dist/bin')
    .setTSConfigPath('./tsconfig.bin.json')
    .toJSON(),

  // src
  new RollupConfig().setTSConfigPath('./tsconfig.src.json').toJSON(),
];
