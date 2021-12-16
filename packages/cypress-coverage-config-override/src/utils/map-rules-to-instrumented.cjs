const MISSING_ONE_OF_BABEL_RULE_ERROR = require('../constants/missing-one-of-babel-rule-error.cjs');
const findOneOfBabelRule = require('../utils/find-one-of-babel-rule.cjs');
const mapOneOfBabelRuleToInstrumented = require('../utils/map-one-of-babel-rule-to-instrumented.cjs');

const NEXT_INDEX = 1;
const NOT_FOUND = -1;
const START = 0;

module.exports = function mapRulesToInstrumented(rules) {
  const oneOfRuleBabelRuleIndex = rules.findIndex(findOneOfBabelRule);
  if (oneOfRuleBabelRuleIndex === NOT_FOUND) {
    throw MISSING_ONE_OF_BABEL_RULE_ERROR;
  }

  const oneOfBabelRule = rules[oneOfRuleBabelRuleIndex];
  return [
    ...rules.slice(START, oneOfRuleBabelRuleIndex),
    mapOneOfBabelRuleToInstrumented(oneOfBabelRule),
    ...rules.slice(oneOfRuleBabelRuleIndex + NEXT_INDEX),
  ];
};
