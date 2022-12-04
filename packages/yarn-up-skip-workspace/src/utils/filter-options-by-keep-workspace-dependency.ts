const KEEP_WORKSPACE_DEPENDENCY =
  // eslint-disable-next-line no-control-regex
  /^\x1B\[36m>\x1B\[39m \x1B\[36m\x1B\[4mKeep (@[\w-]+\/[\w-]+)@workspace:\^\x1B\[24m\x1B\[39m \x1B\[2m\(no changes\)\x1B\[22m$/;

export default function filterOptionsByKeepWorkspaceDependency(
  option: string,
): boolean {
  return KEEP_WORKSPACE_DEPENDENCY.test(option);
}
