const PACKAGE_JSON = require('../constants/package-json.cjs');
const mapPackageJsonToDependenciesRecord = require('../utils/map-package-json-to-dependencies-record.cjs');

const DEPENDENCIES_RECORD = mapPackageJsonToDependenciesRecord(PACKAGE_JSON);

module.exports = DEPENDENCIES_RECORD;
