const PACKAGE_JSON = require('../constants/package-json.cjs');

const DEFAULT_PEER_DEPENDENCIES_RECORD = Object.create(null);

const PEER_DEPENDENCIES_RECORD =
  PACKAGE_JSON.peerDependencies ?? DEFAULT_PEER_DEPENDENCIES_RECORD;

module.exports = PEER_DEPENDENCIES_RECORD;
