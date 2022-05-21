import type { RuleSetRule } from 'webpack';
import type NextSwcRule from '../types/next-swc-rule';

export default function findNextSwcRule(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): rule is NextSwcRule {
  return (
    typeof rule.use === 'object' &&
    !Array.isArray(rule.use) &&
    typeof rule.use.loader === 'string' &&
    rule.use.loader === 'next-swc-loader' &&
    typeof rule.use.options === 'object'
  );
}
