export default function findCoverageSummaryObjectError(
  value: unknown,
): boolean {
  return (
    value instanceof Error &&
    value.message ===
      'Invalid file coverage object, missing keys, found:lines,statements,functions,branches,branchesTrue'
  );
}
