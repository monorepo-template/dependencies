import mapRecordToKeysSet from '../utils/map-record-to-keys-set';
import DEPENDENCIES_RECORD from './dependencies-record';
import PEER_DEPENDENCIES_RECORD from './peer-dependencies-record';

const EXTERNAL_DEPENDENCIES_SET: Set<string> = new Set([
  ...mapRecordToKeysSet(DEPENDENCIES_RECORD),
  ...mapRecordToKeysSet(PEER_DEPENDENCIES_RECORD),
]);

export default EXTERNAL_DEPENDENCIES_SET;
