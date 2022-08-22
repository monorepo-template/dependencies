import path from 'path';
import RELATIVE_TSCONFIG_PATH from './relative-tsconfig-path';

const ABSOLUTE_TSCONFIG_PATH: string = require.resolve(
  path.join(process.cwd(), RELATIVE_TSCONFIG_PATH),
);

export default ABSOLUTE_TSCONFIG_PATH;
