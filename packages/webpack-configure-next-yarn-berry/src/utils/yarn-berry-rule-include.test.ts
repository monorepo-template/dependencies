import yarnBerryRuleInclude from './yarn-berry-rule-include';

describe('yarnBerryRuleInclude', (): void => {
  it('should not include the Yarn Berry virtual modules', (): void => {
    expect(yarnBerryRuleInclude('path/.yarn/$$virtual/to')).toBe(false);
  });

  it('should not include the Yarn Berry cache modules', (): void => {
    expect(yarnBerryRuleInclude('path/.yarn/cache/to')).toBe(false);
  });

  it('should not include the Yarn Berry unplugged modules', (): void => {
    expect(yarnBerryRuleInclude('path/.yarn/unplugged/to')).toBe(false);
  });

  it('should include other modules', (): void => {
    expect(yarnBerryRuleInclude('path/to')).toBe(true);
  });
});
