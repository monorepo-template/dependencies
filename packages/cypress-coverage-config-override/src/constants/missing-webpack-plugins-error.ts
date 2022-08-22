const MISSING_WEBPACK_PLUGINS_ERROR: Error = new Error(
  'Expected Webpack configuration to have a `plugins` property.',
);

export default MISSING_WEBPACK_PLUGINS_ERROR;
