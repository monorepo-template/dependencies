import type { RuleSetRule } from 'webpack';

export default interface OneOfRuleSetRule extends RuleSetRule {
  readonly oneOf: RuleSetRule[];
}
