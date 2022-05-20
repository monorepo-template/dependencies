import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration, ModuleOptions, RuleSetRule } from 'webpack';
import type Defined from './types/defined';
import mapLoaderToYarnBerryRule from './utils/map-loader-to-yarn-berry-rule';

export default function configureNextYarnBerry(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  { module, ...config }: Readonly<Configuration>,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  { defaultLoaders }: Readonly<WebpackConfigContext>,
): Configuration {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const babelLoader: Defined<Required<RuleSetRule>['use']> =
    defaultLoaders.babel;
  const yarnBerryRule: RuleSetRule = mapLoaderToYarnBerryRule(babelLoader);

  const getModule = (): ModuleOptions => {
    if (typeof module === 'undefined') {
      return {
        rules: [yarnBerryRule],
      };
    }

    const getRules = (): (RuleSetRule | '...')[] => {
      if (typeof module.rules === 'undefined') {
        return [yarnBerryRule];
      }
      return [...module.rules, yarnBerryRule];
    };

    return {
      ...module,
      rules: getRules(),
    };
  };

  return {
    ...config,
    module: getModule(),
  };
}
