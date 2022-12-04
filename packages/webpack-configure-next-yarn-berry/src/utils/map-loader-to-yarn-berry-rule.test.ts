/// <reference types="jest" />
import type { RuleSetRule } from 'webpack';
import YARN_BERRY_RULE_TEST from '../constants/yarn-berry-rule-test';
import yarnBerryRuleInclude from '../utils/yarn-berry-rule-include';
import mapLoaderToYarnBerryRule from './map-loader-to-yarn-berry-rule';

const TEST_LOADER = 'test-loader';

describe('mapLoaderToYarnBerryRule', (): void => {
  it('should return the Yarn Berry rule', (): void => {
    const rule: RuleSetRule = mapLoaderToYarnBerryRule(TEST_LOADER);
    expect(rule.include).toBe(yarnBerryRuleInclude);
    expect(rule.test).toBe(YARN_BERRY_RULE_TEST);
    expect(rule.use).toBe(TEST_LOADER);
  });
});
