import DEPENDENCIES_RECORD from '../constants/dependencies-record.mjs';
import PEER_DEPENDENCIES_RECORD from '../constants/peer-dependencies-record.mjs';
import mapDependenciesRecordToSet from '../utils/map-dependencies-record-to-set.mjs';

const EXTERNAL_DEPENDENCIES_SET = new Set([
  ...mapDependenciesRecordToSet(DEPENDENCIES_RECORD),
  ...mapDependenciesRecordToSet(PEER_DEPENDENCIES_RECORD),
]);

export default EXTERNAL_DEPENDENCIES_SET;
