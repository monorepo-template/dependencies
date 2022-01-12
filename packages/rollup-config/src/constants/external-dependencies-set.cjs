const DEPENDENCIES_RECORD = require('../constants/dependencies-record.cjs');
const PEER_DEPENDENCIES_RECORD = require('../constants/peer-dependencies-record.cjs');
const mapDependenciesRecordToSet = require('../utils/map-dependencies-record-to-set.cjs');

const EXTERNAL_DEPENDENCIES_SET = new Set([
  ...mapDependenciesRecordToSet(DEPENDENCIES_RECORD),
  ...mapDependenciesRecordToSet(PEER_DEPENDENCIES_RECORD),
]);

module.exports = EXTERNAL_DEPENDENCIES_SET;
