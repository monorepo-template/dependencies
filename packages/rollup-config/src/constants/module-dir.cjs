const PACKAGE_JSON = require('../constants/package-json.cjs');
const mapPathToDir = require('../utils/map-path-to-dir.cjs');

const MODULE_DIR = mapPathToDir(PACKAGE_JSON.module);

module.exports = MODULE_DIR;
