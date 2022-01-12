import PACKAGE_JSON from '../constants/package-json.mjs';

const DEFAULT_DEPENDENCIES_RECORD = Object.create(null);

const DEPENDENCIES_RECORD =
  PACKAGE_JSON.dependencies ?? DEFAULT_DEPENDENCIES_RECORD;

export default DEPENDENCIES_RECORD;
