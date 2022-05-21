import type WebpackRuleLoader from '../types/webpack-rule-loader';

export default interface NextSwcLoader extends WebpackRuleLoader {
  readonly loader: 'next-swc-loader';
  readonly options: Record<string, unknown>;
}
