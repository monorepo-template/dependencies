import type { RuleSetRule } from 'webpack';
import type OneOfRuleSetRule from '../types/one-of-rule-set-rule';
import findBabelRule from './find-babel-rule';
import findOneOf from './find-one-of';

export default function findOneOfBabelRule(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule> | '...',
): rule is OneOfRuleSetRule {
  if (rule === '...') {
    return false;
  }

  return findOneOf(rule) && rule.oneOf.some(findBabelRule);
}
