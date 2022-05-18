import LOGGER from '../../constants/logger.mjs';
import FILES_PROPERTY_ERROR from './constants/files-property-error.mjs';
import PACKAGE_DIRECTORY_NAMES from './constants/package-directory-names.mjs';
import mapPackageDirectoryNameToPackageJson from './utils/map-package-directory-name-to-package-json.mjs';
import mapPackageJsonToDependenciesSet from './utils/map-package-json-to-dependencies-set.mjs';
import mapPackageJsonToPeerDependenciesList from './utils/map-package-json-to-peer-dependencies-list.mjs';

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

    // Check for a `files` property.
    if (Object.prototype.hasOwnProperty.call(packageJson, 'files')) {
      LOGGER.addItem('files');
      LOGGER.indent();
      LOGGER.addError(FILES_PROPERTY_ERROR);
      LOGGER.unindent();
    }

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
        const packageDependenciesSet =
          mapPackageJsonToDependenciesSet(packageJson);
        const filterByMissingDependency = dependency =>
          !packageDependenciesSet.has(dependency);

        const dependencyPackageJson =
          packageDirectoryToJsonMap.get(dependencyDirectory);
        const dependencyPeerDependenciesList =
          mapPackageJsonToPeerDependenciesList(dependencyPackageJson);
        const missingDependencies = dependencyPeerDependenciesList.filter(
          filterByMissingDependency,
        );
        for (const missingDependency of missingDependencies) {
          LOGGER.addError(
            new Error(
              `Expected dependency \`${missingDependency}\` as required by \`${name}\`.`,
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
