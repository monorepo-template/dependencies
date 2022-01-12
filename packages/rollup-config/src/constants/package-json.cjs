const getPackageJson = require('../utils/get-package-json.cjs');

const PACKAGE_JSON = getPackageJson();

module.exports = PACKAGE_JSON;
