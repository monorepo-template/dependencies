const mapModuleToInstrumented = require('./utils/map-module-to-instrumented.cjs');
const mapPluginsToCypressTSConfig = require('./utils/map-plugins-to-cypress-tsconfig.cjs');

module.exports = function cypressCoverageConfigOverride(config) {
  return {
    ...config,
    module: mapModuleToInstrumented(config.module),
    plugins: mapPluginsToCypressTSConfig(config.plugins),
  };
};
