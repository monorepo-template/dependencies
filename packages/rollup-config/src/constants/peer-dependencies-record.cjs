const PACKAGE_JSON = require('../constants/package-json.cjs');
const mapPackageJsonToPeerDependenciesRecord = require('../utils/map-package-json-to-peer-dependencies-record.cjs');

const PEER_DEPENDENCIES_RECORD =
  mapPackageJsonToPeerDependenciesRecord(PACKAGE_JSON);

module.exports = PEER_DEPENDENCIES_RECORD;
