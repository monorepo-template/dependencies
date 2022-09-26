export default function reduceEntriesToRecord<
  A extends number | string | symbol,
  B,
>(record: Record<A, B>, [key, value]: readonly [A, B]): Record<A, B> {
  return {
    ...record,
    [key]: value,
  };
}
