import type { RuleSetRule } from 'webpack';
import type OneOfRuleSetRule from '../types/one-of-rule-set-rule';

export default function findOneOf(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): rule is OneOfRuleSetRule {
  return Array.isArray(rule.oneOf);
}
