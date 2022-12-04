import RollupConfig from '@monorepo-template/rollup-config/new';

export default [
  // src
  new RollupConfig().setTSConfigPath('./tsconfig.src.json').toJSON(),

  // bin
  new RollupConfig()
    .addExternalDependency('@monorepo-template/up')
    .addInput('up', 'src/bin/up.ts')
    .setCjsDirectory(null)
    .setEsmDirectory('./dist/esm/bin')
    .setTSConfigPath('./tsconfig.bin.json')
    .toJSON(),
];
