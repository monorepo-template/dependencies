import type PackageJson from '../types/package-json';

const DEFAULT_DEPENDENCIES_RECORD: Record<string, string> = Object.freeze({});

export default function mapPackageJsonToDependenciesRecord(
  packageJson: PackageJson,
): Record<string, string> {
  if (typeof packageJson.dependencies !== 'undefined') {
    return packageJson.dependencies;
  }

  return DEFAULT_DEPENDENCIES_RECORD;
}
