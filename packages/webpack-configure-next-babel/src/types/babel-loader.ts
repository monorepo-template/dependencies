import type WebpackRuleLoader from '../types/webpack-rule-loader';

export default interface BabelLoader extends WebpackRuleLoader {
  readonly loader: string;
}
