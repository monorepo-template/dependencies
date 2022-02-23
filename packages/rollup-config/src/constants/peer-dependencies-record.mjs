import PACKAGE_JSON from '../constants/package-json.mjs';
import mapPackageJsonToPeerDependenciesRecord from '../utils/map-package-json-to-peer-dependencies-record.mjs';

const PEER_DEPENDENCIES_RECORD =
  mapPackageJsonToPeerDependenciesRecord(PACKAGE_JSON);

export default PEER_DEPENDENCIES_RECORD;
