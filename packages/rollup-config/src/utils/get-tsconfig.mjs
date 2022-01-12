import { existsSync } from 'fs';
import IS_DEV from '../constants/is-dev.mjs';
import TSCONFIG_DEV_PATH from '../constants/tsconfig-dev-path.mjs';

export default function getTSConfig() {
  if (IS_DEV && existsSync(TSCONFIG_DEV_PATH)) {
    return './tsconfig.development.json';
  }
  return './tsconfig.json';
}
