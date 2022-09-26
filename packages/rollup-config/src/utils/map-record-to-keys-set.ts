export default function mapRecordToKeysSet(
  record: Readonly<Record<string, string>>,
): Set<string> {
  return new Set(Object.keys(record));
}
