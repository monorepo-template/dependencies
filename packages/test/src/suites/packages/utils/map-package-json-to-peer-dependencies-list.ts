import type PackageJson from '../../../types/package-json';

const DEFAULT_PEER_DEPENDENCIES: Record<string, string> = Object.freeze({});

export default function mapPackageJsonToPeerDependenciesList(
  packageJson: Readonly<PackageJson>,
): readonly string[] {
  const { peerDependencies = DEFAULT_PEER_DEPENDENCIES } = packageJson;
  return Object.keys(peerDependencies);
}
