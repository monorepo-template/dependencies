import PACKAGE_JSON from '../constants/package-json.mjs';
import mapPackageJsonToDependenciesRecord from '../utils/map-package-json-to-dependencies-record.mjs';

const DEPENDENCIES_RECORD = mapPackageJsonToDependenciesRecord(PACKAGE_JSON);

export default DEPENDENCIES_RECORD;
