const PACKAGE_JSON = require('../constants/package-json.cjs');

const DEFAULT_DEPENDENCIES_RECORD = Object.create(null);

const DEPENDENCIES_RECORD =
  PACKAGE_JSON.dependencies ?? DEFAULT_DEPENDENCIES_RECORD;

module.exports = DEPENDENCIES_RECORD;
