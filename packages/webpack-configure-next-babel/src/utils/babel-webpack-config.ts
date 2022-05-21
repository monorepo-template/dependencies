/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration, ModuleOptions, RuleSetRule } from 'webpack';
import BABEL_LOADER_PATH from '../constants/babel-loader-path';
import MISSING_NEXT_CONFIG_ERROR from '../constants/missing-next-config-error';
import type BabelLoader from '../types/babel-loader';
import type BabelRule from '../types/babel-rule';
import type NextSwcLoader from '../types/next-swc-loader';
import type NextSwcRule from '../types/next-swc-rule';
import type OneOfRule from '../types/one-of-rule';
import filterByArray from '../utils/filter-by-array';
import filterByNextConfig from '../utils/filter-by-next-config';
import filterByOneOf from '../utils/filter-by-one-of';
import findBabelRule from '../utils/find-babel-rule';
import findNextSwcRule from '../utils/find-next-swc-rule';
import mapBabelOptionsToRuleOverrides from '../utils/map-babel-options-to-rule-overrides';

export default class BabelWebpackConfig {
  private readonly _overrides: readonly Readonly<RuleSetRule>[];

  private readonly _webpackConfigContext: Readonly<WebpackConfigContext>;

  private readonly _webpackConfig: Readonly<Configuration>;

  public constructor(
    webpackConfig: Readonly<Configuration>,
    webpackConfigContext: Readonly<WebpackConfigContext>,
    babelOptions: Readonly<Record<string, unknown>>,
  ) {
    this._overrides = mapBabelOptionsToRuleOverrides(babelOptions);
    this._webpackConfig = webpackConfig;
    this._webpackConfigContext = webpackConfigContext;
  }

  private get _moduleOptions(): ModuleOptions | undefined {
    const { module: moduleOptions } = this._webpackConfig;
    if (typeof moduleOptions === 'undefined') {
      return;
    }
    return this._mapModuleOptionsToBabelModuleOptions(moduleOptions);
  }

  public toJSON(): Configuration {
    const moduleOptions: ModuleOptions | undefined = this._moduleOptions;
    if (typeof moduleOptions === 'undefined') {
      return this._webpackConfig;
    }
    return {
      ...this._webpackConfig,
      module: moduleOptions,
    };
  }

  private _mapModuleOptionsToBabelModuleOptions(
    moduleOptions: Readonly<ModuleOptions>,
  ): ModuleOptions {
    const { rules } = moduleOptions;
    if (typeof rules === 'undefined') {
      return moduleOptions;
    }
    return {
      ...moduleOptions,
      rules: this._mapRulesToBabelRules(rules),
    };
  }

  // Based on Next's Babel loader.
  // https://github.com/vercel/next.js/blob/79016b879f200c99cc3c3b69b2b84dee14b6615e/packages/next/build/webpack-config.ts#L440
  private _mapNextSwcLoaderOptionsToBabelLoaderOptions(
    options: Record<string, unknown>,
  ): Record<string, unknown> {
    const { hasReactRefresh, isServer, nextConfig, pagesDir } = options;
    if (!filterByNextConfig(nextConfig)) {
      throw MISSING_NEXT_CONFIG_ERROR;
    }
    return {
      cwd: this._webpackConfigContext.dir,
      development: this._webpackConfigContext.dev,
      distDir: `${this._webpackConfigContext.dir}/${nextConfig.distDir}`,
      hasJsxRuntime: true,
      hasReactRefresh,
      isServer,
      overrides: this._overrides,
      pagesDir,
    };
  }

  private _mapNextSwcLoaderToBabelLoader({
    options,
  }: NextSwcLoader): BabelLoader {
    return {
      loader: BABEL_LOADER_PATH,
      options: this._mapNextSwcLoaderOptionsToBabelLoaderOptions(options),
    };
  }

  private _mapNextSwcRuleToBabelRule(rule: NextSwcRule): BabelRule {
    return {
      ...rule,
      use: this._mapNextSwcLoaderToBabelLoader(rule.use),
    };
  }

  private _mapOneOfRuleToBabelOneOfRule(rule: Readonly<OneOfRule>): OneOfRule {
    const mapRuleToBabelRule = this._mapRuleToBabelRule.bind(this);
    return {
      ...rule,
      oneOf: rule.oneOf.map<RuleSetRule>(mapRuleToBabelRule),
    };
  }

  private _mapRuleToBabelRule(rule: Readonly<RuleSetRule>): RuleSetRule;
  private _mapRuleToBabelRule(rule: '...'): '...';
  private _mapRuleToBabelRule(
    rule: Readonly<RuleSetRule> | '...',
  ): RuleSetRule | '...';
  private _mapRuleToBabelRule(
    rule: Readonly<RuleSetRule> | '...',
  ): RuleSetRule | '...' {
    if (rule === '...') {
      return '...';
    }

    if (filterByOneOf(rule)) {
      return this._mapOneOfRuleToBabelOneOfRule(rule);
    }

    // Extend the Babel loader with Next/Babel config.
    if (findBabelRule(rule)) {
      return {
        ...rule,
        use: {
          ...rule.use,
          options: this._overrideBabelLoaderOptions(rule.use.options),
        },
      };
    }

    // Replace the Next SWC loader with Next/Babel config.
    if (findNextSwcRule(rule)) {
      return this._mapNextSwcRuleToBabelRule(rule);
    }

    // Irrelevant rules are unchanged.
    return rule;
  }

  private _mapRulesToBabelRules(
    rules: readonly (Readonly<RuleSetRule> | '...')[],
  ): (RuleSetRule | '...')[] {
    const mapRuleToBabelRule = this._mapRuleToBabelRule.bind(this);
    return rules.map(mapRuleToBabelRule);
  }

  private _mergeOverrides(overrides: unknown): readonly unknown[] {
    if (!filterByArray(overrides)) {
      return this._overrides;
    }
    return [...overrides, ...this._overrides];
  }

  private _overrideBabelLoaderOptions(
    options: Readonly<Record<string, unknown>> | string | undefined,
  ): Record<string, unknown> {
    if (typeof options !== 'object') {
      return {
        overrides: this._overrides,
      };
    }
    return {
      ...options,
      overrides: this._mergeOverrides(options.overrides),
    };
  }
}
