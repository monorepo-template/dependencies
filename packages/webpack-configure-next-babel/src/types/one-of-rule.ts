import type { RuleSetRule } from 'webpack';

export default interface OneOfRule extends RuleSetRule {
  readonly oneOf: RuleSetRule[];
}
