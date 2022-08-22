import type { RuleSetRule } from 'webpack';
import MISSING_ONE_OF_BABEL_RULE_ERROR from '../constants/missing-one-of-babel-rule-error';
import type OneOfRuleSetRule from '../types/one-of-rule-set-rule';
import findOneOfBabelRule from './find-one-of-babel-rule';
import mapOneOfBabelRuleToInstrumented from './map-one-of-babel-rule-to-instrumented';

const NEXT_INDEX = 1;
const NOT_FOUND = -1;
const START = 0;

export default function mapRulesToInstrumented(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rules: readonly (Readonly<RuleSetRule> | '...')[],
): (RuleSetRule | '...')[] {
  const oneOfRuleBabelRuleIndex: number = rules.findIndex(findOneOfBabelRule);
  if (oneOfRuleBabelRuleIndex === NOT_FOUND) {
    throw MISSING_ONE_OF_BABEL_RULE_ERROR;
  }

  // We know this is `OneOfRuleSetRule` because the `findIndex` function is a
  //   type guard.
  const oneOfBabelRule: OneOfRuleSetRule = rules[
    oneOfRuleBabelRuleIndex
  ] as OneOfRuleSetRule;

  return [
    ...rules.slice(START, oneOfRuleBabelRuleIndex),
    mapOneOfBabelRuleToInstrumented(oneOfBabelRule),
    ...rules.slice(oneOfRuleBabelRuleIndex + NEXT_INDEX),
  ];
}
