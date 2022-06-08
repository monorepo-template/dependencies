import RollupConfig from '@monorepo-template/rollup-config/new';

export default new RollupConfig()
  .addInput('index', 'src/index.ts')
  .addInput('bin/test', 'src/bin/test.ts')
  .toJSON();
