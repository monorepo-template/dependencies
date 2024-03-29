export default function filterByArray<T>(
  value: unknown | readonly T[],
): value is T[] {
  return Array.isArray(value);
}
