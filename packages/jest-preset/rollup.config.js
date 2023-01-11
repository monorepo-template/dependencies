import { RollupConfig } from '@monorepo-template/rollup-config';

export default new RollupConfig()
  .setCjsDirectory(null)
  .setTSConfigPath('./tsconfig.rollup.json')
  .toJSON();
