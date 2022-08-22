import type { RuleSetRule } from 'webpack';
import MISSING_BABEL_LOADER_ERROR from '../constants/missing-babel-loader-error';
import type OneOfRuleSetRule from '../types/one-of-rule-set-rule';
import findBabelRule from './find-babel-rule';
import mapBabelRuleToInstrumented from './map-babel-rule-to-instrumented';

const NEXT_INDEX = 1;
const NOT_FOUND = -1;
const START = 0;

export default function mapOneOfBabelRuleToInstrumented(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<OneOfRuleSetRule>,
): OneOfRuleSetRule {
  const babelRuleIndex: number = rule.oneOf.findIndex(findBabelRule);
  if (babelRuleIndex === NOT_FOUND) {
    throw MISSING_BABEL_LOADER_ERROR;
  }

  const babelRule: RuleSetRule = rule.oneOf[babelRuleIndex];
  return {
    ...rule,
    oneOf: [
      ...rule.oneOf.slice(START, babelRuleIndex),
      mapBabelRuleToInstrumented(babelRule),
      ...rule.oneOf.slice(babelRuleIndex + NEXT_INDEX),
    ],
  };
}
