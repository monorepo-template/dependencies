import PACKAGE_JSON from '../constants/package-json.mjs';
import mapPathToDir from '../utils/map-path-to-dir.mjs';

const MAIN_DIR = mapPathToDir(PACKAGE_JSON.main);

export default MAIN_DIR;
