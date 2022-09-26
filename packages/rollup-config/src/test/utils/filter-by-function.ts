export default function filterByFunction<
  A extends unknown[],
  R,
  T extends (...args: A) => R = (...args: A) => R,
>(value: T | unknown): value is T {
  return typeof value === 'function';
}
