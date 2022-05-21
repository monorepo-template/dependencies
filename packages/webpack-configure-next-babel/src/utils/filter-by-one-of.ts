import type { RuleSetRule } from 'webpack';
import type OneOfRule from '../types/one-of-rule';

export default function filterByOneOf(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): rule is OneOfRule {
  return (
    Object.prototype.hasOwnProperty.call(rule, 'oneOf') &&
    Array.isArray(rule.oneOf)
  );
}
