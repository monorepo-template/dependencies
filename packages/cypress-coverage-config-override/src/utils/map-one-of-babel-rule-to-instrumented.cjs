const MISSING_BABEL_LOADER_ERROR = require('../constants/missing-babel-loader-error.cjs');
const findBabelRule = require('../utils/find-babel-rule.cjs');
const mapBabelRuleToInstrumented = require('../utils/map-babel-rule-to-instrumented.cjs');

const NEXT_INDEX = 1;
const NOT_FOUND = -1;
const START = 0;

module.exports = function mapOneOfBabelRuleToInstrumented(rule) {
  const babelRuleIndex = rule.oneOf.findIndex(findBabelRule);
  if (babelRuleIndex === NOT_FOUND) {
    throw MISSING_BABEL_LOADER_ERROR;
  }

  const babelRule = rule.oneOf[babelRuleIndex];
  return {
    ...rule,
    oneOf: [
      ...rule.oneOf.slice(START, babelRuleIndex),
      mapBabelRuleToInstrumented(babelRule),
      ...rule.oneOf.slice(babelRuleIndex + NEXT_INDEX),
    ],
  };
};
