const DEFAULT_PEER_DEPENDENCIES = Object.freeze(Object.create(null));

export default function mapPackageJsonToPeerDependenciesList(packageJson) {
  const { peerDependencies = DEFAULT_PEER_DEPENDENCIES } = packageJson;
  return Object.keys(peerDependencies);
}
