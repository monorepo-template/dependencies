import PACKAGE_JSON from '../constants/package-json.mjs';

const DEFAULT_PEER_DEPENDENCIES_RECORD = Object.create(null);

const PEER_DEPENDENCIES_RECORD =
  PACKAGE_JSON.peerDependencies ?? DEFAULT_PEER_DEPENDENCIES_RECORD;

export default PEER_DEPENDENCIES_RECORD;
