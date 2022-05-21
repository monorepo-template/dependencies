import type { RuleSetRule } from 'webpack';
import mapBabelOptionsToRule from '../utils/map-babel-options-to-rule';

export default function mapBabelOptionsToRuleOverrides(
  babelOptions: Readonly<Record<string, unknown>>,
): RuleSetRule[] {
  return [mapBabelOptionsToRule(babelOptions)];
}
