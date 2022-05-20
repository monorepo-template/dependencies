export default function yarnBerryRuleInclude(input: string): boolean {
  return (
    !input.includes('/.yarn/$$virtual/') &&
    !input.includes('/.yarn/cache/') &&
    !input.includes('/.yarn/unplugged/')
  );
}
