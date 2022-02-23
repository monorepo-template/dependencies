import DEPENDENCIES_RECORD from '../constants/dependencies-record.mjs';
import PEER_DEPENDENCIES_RECORD from '../constants/peer-dependencies-record.mjs';
import mapRecordToKeysSet from '../utils/map-record-to-keys-set.mjs';

const EXTERNAL_DEPENDENCIES_SET = new Set([
  ...mapRecordToKeysSet(DEPENDENCIES_RECORD),
  ...mapRecordToKeysSet(PEER_DEPENDENCIES_RECORD),
]);

export default EXTERNAL_DEPENDENCIES_SET;
