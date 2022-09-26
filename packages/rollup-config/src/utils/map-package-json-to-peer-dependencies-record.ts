import type PackageJson from '../types/package-json';

const DEFAULT_PEER_DEPENDENCIES_RECORD: Record<string, string> = Object.freeze(
  {},
);

export default function mapPackageJsonToPeerDependenciesRecord(
  packageJson: PackageJson,
): Record<string, string> {
  if (typeof packageJson.peerDependencies !== 'undefined') {
    return packageJson.peerDependencies;
  }

  return DEFAULT_PEER_DEPENDENCIES_RECORD;
}
