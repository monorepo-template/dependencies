import type { Configuration } from 'webpack';
import MISSING_WEBPACK_MODULE_ERROR from './constants/missing-webpack-module-error';
import MISSING_WEBPACK_PLUGINS_ERROR from './constants/missing-webpack-plugins-error';
import mapModuleToInstrumented from './utils/map-module-to-instrumented';
import mapPluginsToCypressTSConfig from './utils/map-plugins-to-cypress-tsconfig';

export default function cypressCoverageConfigOverride(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  config: Readonly<Configuration>,
  // env?: string | undefined,
): Configuration {
  const { module: m, plugins } = config;

  if (typeof m === 'undefined') {
    throw MISSING_WEBPACK_MODULE_ERROR;
  }

  if (typeof plugins === 'undefined') {
    throw MISSING_WEBPACK_PLUGINS_ERROR;
  }

  return {
    ...config,
    module: mapModuleToInstrumented(m),
    plugins: mapPluginsToCypressTSConfig(plugins),
  };
}
