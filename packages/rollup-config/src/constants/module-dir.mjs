import PACKAGE_JSON from '../constants/package-json.mjs';
import mapPathToDir from '../utils/map-path-to-dir.mjs';

const MODULE_DIR = mapPathToDir(PACKAGE_JSON.module);

export default MODULE_DIR;
