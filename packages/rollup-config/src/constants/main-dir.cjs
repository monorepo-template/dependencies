const PACKAGE_JSON = require('../constants/package-json.cjs');
const mapPathToDir = require('../utils/map-path-to-dir.cjs');

const MAIN_DIR = mapPathToDir(PACKAGE_JSON.main);

module.exports = MAIN_DIR;
