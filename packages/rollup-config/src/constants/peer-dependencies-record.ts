import mapPackageJsonToPeerDependenciesRecord from '../utils/map-package-json-to-peer-dependencies-record';
import PACKAGE_JSON from './package-json';

const PEER_DEPENDENCIES_RECORD: Record<string, string> =
  mapPackageJsonToPeerDependenciesRecord(PACKAGE_JSON);

export default PEER_DEPENDENCIES_RECORD;
