import type { RuleSetRule } from 'webpack';
import BABEL_PLUGIN_ISTANBUL_PATH from '../constants/babel-plugin-istanbul-path';
import INVALID_BABEL_RULE_OPTIONS_ERROR from '../constants/invalid-babel-rule-options-error';
import filterByArray from './filter-by-array';

export default function mapBabelRuleToInstrumented(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  rule: Readonly<RuleSetRule>,
): RuleSetRule {
  const { options } = rule;
  if (typeof options !== 'object') {
    throw INVALID_BABEL_RULE_OPTIONS_ERROR;
  }

  const { plugins } = options;
  if (!filterByArray(plugins)) {
    return {
      ...rule,
      options: {
        ...options,
        plugins: [BABEL_PLUGIN_ISTANBUL_PATH],
      },
    };
  }

  return {
    ...rule,
    options: {
      ...options,
      plugins: [...plugins, BABEL_PLUGIN_ISTANBUL_PATH],
    },
  };
}
