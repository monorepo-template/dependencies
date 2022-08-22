const MISSING_WEBPACK_MODULE_ERROR: Error = new Error(
  'Expected Webpack configuration to have a `module` property.',
);

export default MISSING_WEBPACK_MODULE_ERROR;
