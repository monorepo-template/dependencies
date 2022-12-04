const USE_RESOLVED_FROM_LATEST =
  // eslint-disable-next-line no-control-regex
  /^\x1B\[36m>\x1B\[39m \x1B\[36m\x1B\[4mUse (@[\w-]+\/[\w-]+)@[\^~]?(\d+\.\d+\.\d+(?:-\w+\.\d+)?)\x1B\[24m\x1B\[39m \x1B\[2m\(resolved from latest\)\x1B\[22m(?:\x1B\[\d+A\x1B\[\d+G)?$/;

export default function filterOptionsByUseResolvedFromLatest(option) {
  return USE_RESOLVED_FROM_LATEST.test(option);
}
