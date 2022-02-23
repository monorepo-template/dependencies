const DEFAULT_PEER_DEPENDENCIES_RECORD = Object.create(null);

export default function mapPackageJsonToPeerDependenciesRecord(packageJson) {
  if (Object.prototype.hasOwnProperty.call(packageJson, 'peerDependencies')) {
    return packageJson.peerDependencies;
  }
  return DEFAULT_PEER_DEPENDENCIES_RECORD;
}
