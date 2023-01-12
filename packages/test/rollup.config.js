import { RollupConfig } from '@monorepo-template/rollup-config';

export default new RollupConfig()
  .addInput('index', 'src/index.ts')
  .addInput('bin/test', 'src/bin/test.ts')
  .setTSConfigPath('./tsconfig.json')
  .toJSON();
