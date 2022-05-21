import LOGGER from '../../constants/logger.mjs';
import DEFAULT_EXPORT_CONDITION_INDEX_ERROR from './constants/default-export-condition-index-error.mjs';
import FILES_PROPERTY_ERROR from './constants/files-property-error.mjs';
import PACKAGE_DIRECTORY_NAMES from './constants/package-directory-names.mjs';
import filterByRecord from './utils/filter-by-record.mjs';
import findDefaultString from './utils/find-default-string.mjs';
import mapPackageDirectoryNameToPackageJson from './utils/map-package-directory-name-to-package-json.mjs';
import mapPackageJsonToDependenciesSet from './utils/map-package-json-to-dependencies-set.mjs';
import mapPackageJsonToPeerDependenciesList from './utils/map-package-json-to-peer-dependencies-list.mjs';

const ARRAY_INDEX_OFFSET = 1;
const NOT_FOUND = -1;
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

    // Check for an `exports` property.
    if (
      Object.prototype.hasOwnProperty.call(packageJson, 'exports') &&
      filterByRecord(packageJson.exports)
    ) {
      LOGGER.addItem('exports');
      LOGGER.indent();

      const exportsEntries = Object.entries(packageJson.exports);
      for (const [exportPath, exportRecord] of exportsEntries) {
        if (!filterByRecord(exportRecord)) {
          continue;
        }

        LOGGER.addItem(exportPath);

        const exportKeys = Object.keys(exportRecord);
        const defaultExportIndex = exportKeys.findIndex(findDefaultString);
        if (defaultExportIndex === NOT_FOUND) {
          continue;
        }

        const lastExportIndex = exportKeys.length - ARRAY_INDEX_OFFSET;
        if (defaultExportIndex !== lastExportIndex) {
          LOGGER.indent();
          LOGGER.addError(DEFAULT_EXPORT_CONDITION_INDEX_ERROR);
          LOGGER.unindent();
        }
      }

      LOGGER.unindent();
    }

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
