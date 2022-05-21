import type { RuleSetRule } from 'webpack';
import BABEL_LOADER_REGEXP from '../constants/babel-loader-regexp';
import type BabelRule from '../types/babel-rule';

export default function findBabelRule(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): rule is BabelRule {
  return (
    typeof rule.use === 'object' &&
    !Array.isArray(rule.use) &&
    typeof rule.use.loader === 'string' &&
    BABEL_LOADER_REGEXP.test(rule.use.loader)
  );
}
