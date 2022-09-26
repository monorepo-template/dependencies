import reduceEntriesToRecord from './reduce-entries-to-record';

const INITIAL_RECORD: Readonly<Record<never, never>> = Object.freeze({});

export default function mapMapToRecord<A extends number | string | symbol, B>(
  map: Readonly<Map<A, B>>,
): Record<A, B> {
  const entries: [A, B][] = [...map.entries()];
  const initialRecord: Record<A, B> = INITIAL_RECORD as Record<A, B>;
  return entries.reduce(reduceEntriesToRecord, initialRecord);
}
