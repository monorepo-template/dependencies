export default function mapPackageJsonToDependenciesSet(packageJson) {
  const record = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };
  const arr = Object.keys(record);
  return new Set(arr);
}
