import mapPackageJsonToDependenciesRecord from '../utils/map-package-json-to-dependencies-record';
import PACKAGE_JSON from './package-json';

const DEPENDENCIES_RECORD: Record<string, string> =
  mapPackageJsonToDependenciesRecord(PACKAGE_JSON);

export default DEPENDENCIES_RECORD;
