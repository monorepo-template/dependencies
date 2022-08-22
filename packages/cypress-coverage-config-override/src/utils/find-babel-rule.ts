import type { RuleSetRule } from 'webpack';

export default function findBabelRule(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): rule is RuleSetRule {
  const { loader } = rule;

  if (typeof loader === 'undefined') {
    return false;
  }

  return loader.includes('babel-loader');
}
