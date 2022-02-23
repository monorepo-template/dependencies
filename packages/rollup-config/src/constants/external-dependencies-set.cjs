const DEPENDENCIES_RECORD = require('../constants/dependencies-record.cjs');
const PEER_DEPENDENCIES_RECORD = require('../constants/peer-dependencies-record.cjs');
const mapRecordToKeysSet = require('../utils/map-record-to-keys-set.cjs');

const EXTERNAL_DEPENDENCIES_SET = new Set([
  ...mapRecordToKeysSet(DEPENDENCIES_RECORD),
  ...mapRecordToKeysSet(PEER_DEPENDENCIES_RECORD),
]);

module.exports = EXTERNAL_DEPENDENCIES_SET;
