// `filterByArray` is a type-safe version of `Array.isArray`.

export default function filterByArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
