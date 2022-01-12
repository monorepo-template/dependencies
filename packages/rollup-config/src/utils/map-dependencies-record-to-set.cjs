module.exports = function mapDependenciesRecordToSet(dependencies) {
  return new Set(Object.keys(dependencies));
};
