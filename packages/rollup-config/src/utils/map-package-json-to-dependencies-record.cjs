const DEFAULT_DEPENDENCIES_RECORD = Object.create(null);

module.exports = function mapPackageJsonToDependenciesRecord(packageJson) {
  if (Object.prototype.hasOwnProperty.call(packageJson, 'dependencies')) {
    return packageJson.dependencies;
  }
  return DEFAULT_DEPENDENCIES_RECORD;
};
