import type { RuleSetRule } from 'webpack';
import YARN_BERRY_RULE_TEST from '../constants/yarn-berry-rule-test';
import type Defined from '../types/defined';
import include from '../utils/yarn-berry-rule-include';

export default function mapLoaderToYarnBerryRule(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  use: Defined<Required<RuleSetRule>['use']>,
): RuleSetRule {
  return {
    include,
    test: YARN_BERRY_RULE_TEST,
    use,
  };
}
