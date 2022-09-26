export default function filterByNonNull<T>(value: T | null): value is T {
  return value !== null;
}
