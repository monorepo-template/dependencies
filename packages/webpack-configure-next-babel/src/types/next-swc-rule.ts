import type { RuleSetRule } from 'webpack';
import type NextSwcRuleLoader from '../types/next-swc-loader';

export default interface NextSwcRule extends RuleSetRule {
  readonly use: NextSwcRuleLoader;
}
