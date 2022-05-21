/*
`filterByArrray` is a type-safe alternative to `Array.isArray` that is typed as
  `unknown[]` instead of `any[]`.
*/
export default function filterByArray(
  value: unknown,
): value is readonly unknown[] {
  return Array.isArray(value);
}
