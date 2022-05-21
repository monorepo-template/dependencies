import type { RuleSetRule } from 'webpack';
import type BabelLoader from '../types/babel-loader';

export default interface BabelRule extends RuleSetRule {
  readonly use: BabelLoader;
}
