import LOGGER from '../../constants/logger.mjs';
import PACKAGE_DIRECTORY_NAMES from './constants/package-directory-names.mjs';
import mapPackageDirectoryNameToPackageJson from './utils/map-package-directory-name-to-package-json.mjs';

const WORKSPACE_VERSION = /^workspace:.*$/;

export default function testPackages() {
  LOGGER.addItem('Packages');
  LOGGER.indent();

  const packageDirectoryToJsonMap = new Map();
  const packageNameToDirectoryMap = new Map();
  for (const packageDirectoryName of PACKAGE_DIRECTORY_NAMES) {
    const packageJson =
      mapPackageDirectoryNameToPackageJson(packageDirectoryName);
    packageDirectoryToJsonMap.set(packageDirectoryName, packageJson);
    packageNameToDirectoryMap.set(packageJson.name, packageDirectoryName);
  }

  for (const packageDirectoryName of PACKAGE_DIRECTORY_NAMES) {
    LOGGER.addItem(packageDirectoryName);
    LOGGER.indent();

    const packageJson = packageDirectoryToJsonMap.get(packageDirectoryName);

    // Check for missing peer dependencies.
    for (const dependencyKey of ['dependencies', 'devDependencies']) {
      if (!Object.prototype.hasOwnProperty.call(packageJson, dependencyKey)) {
        continue;
      }

      LOGGER.addItem(dependencyKey);
      LOGGER.indent();

      // For each workspace dependency,
      const dependenciesRecord = packageJson[dependencyKey];
      for (const [name, version] of Object.entries(dependenciesRecord)) {
        if (!WORKSPACE_VERSION.test(version)) {
          continue;
        }

        // If the dependency doesn't exist in the workspace, log an error.
        const dependencyDirectory = packageNameToDirectoryMap.get(name);
        if (typeof dependencyDirectory === 'undefined') {
          LOGGER.addError(
            new Error(
              `Expected to find \`${name}\` in the \`packages\` directory.`,
            ),
          );
          continue;
        }

        // Validate that all peer dependencies are present.
        const packageDependenciesRecord = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
          ...packageJson.peerDependencies,
        };
        const packageDependenciesSet = new Set(
          Object.keys(packageDependenciesRecord),
        );
        const dependencyPackageJson =
          packageDirectoryToJsonMap.get(dependencyDirectory);
        const dependencyPeerDependencies = Object.keys(
          dependencyPackageJson.peerDependencies || Object.create(null),
        );
        for (const dependencyPeerDependency of dependencyPeerDependencies) {
          if (packageDependenciesSet.has(dependencyPeerDependency)) {
            continue;
          }
          LOGGER.addError(
            new Error(
              `Expected dependency \`${dependencyPeerDependency}\` as required by \`${name}\`.`,
            ),
          );
        }
      }

      LOGGER.unindent();
    }

    LOGGER.unindent();
  }

  LOGGER.unindent();
}
